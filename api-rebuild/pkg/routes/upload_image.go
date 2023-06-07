package routes

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"ml-xraylab/api-rebuild/pkg/inference"
	"ml-xraylab/api-rebuild/pkg/utils"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
)

type UploadResponse struct {
	Message  string `json:"message"`
	ImageUrl string `json:"image_url"`
}

func UploadImage(db *sql.DB, jwtKey []byte) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		bearerToken := r.Header.Get("Authorization")
		user, err := utils.ParseBearer(bearerToken, jwtKey)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusUnauthorized)
			return
		}
		_, err = utils.FindUserByUsername(db, user.Username)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusUnauthorized)
			return
		}

		receivedFile, header, err := r.FormFile("")
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
			return
		}
		defer receivedFile.Close()

		if header.Filename == "" {
			err = fmt.Errorf("filename is empty")
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
			return
		}

		fileExtensionSplit := strings.Split(header.Filename, ".")
		fileExtension := strings.ToLower(fileExtensionSplit[len(fileExtensionSplit)-1])
		if fileExtension != "png" {
			err = fmt.Errorf("only png files allowed. got: %s", fileExtension)
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
			return
		}

		newFilename := fmt.Sprintf("%s.png", uuid.New().String())
		fileOnDisk, err := os.OpenFile("./static/"+newFilename, os.O_WRONLY|os.O_CREATE, 0666)
		if err != nil {
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}
		defer fileOnDisk.Close()
		io.Copy(fileOnDisk, receivedFile)

		imageUrl := "files/" + newFilename
		createdAt := time.Now()

		insertQuery := "INSERT INTO Snapshots (user_id, image_path, created_at) VALUES ('%s', '%s', %s)"
		result, err := db.Exec(insertQuery, user.Id, imageUrl, createdAt)
		if err != nil {
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}
		snapshotId, err := result.LastInsertId()
		if err != nil {
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}
		inference.SendEventForInference(int(snapshotId), imageUrl)

		uploadResponse := UploadResponse{
			Message:  "File uploaded successfully!",
			ImageUrl: imageUrl,
		}
		encodedResponse, err := json.Marshal(&uploadResponse)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(encodedResponse)
	}
}
