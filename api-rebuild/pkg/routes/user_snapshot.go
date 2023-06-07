package routes

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"ml-xraylab/api-rebuild/pkg/utils"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

type UpdateSnapshotRequest struct {
	Note       *string `json:"note"`
	Status     *string `json:"status"`
	ImagePath  *string `json:"image_path"`
	MaskPath   *string `json:"mask_path"`
	Conclusion *string `json:"conclusion"`
	Favorite   *bool   `json:"favorite"`
}

func UserSnapshotById(db *sql.DB, jwtKey []byte) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		snapshotId, _ := strconv.Atoi(mux.Vars(r)["id"])
		bearerToken := r.Header.Get("Authorization")
		user, err := utils.ParseBearer(bearerToken, jwtKey)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusUnauthorized)
			return
		}
		user, err = utils.FindUserByUsername(db, user.Username)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusUnauthorized)
			return
		}

		snapshot, err := utils.FindSnapshotById(db, snapshotId)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}

		if r.Method == "GET" {
			if snapshot.UserId == user.Id || user.RoleId == 1 {
				encodedResponse, err := json.Marshal(snapshot)
				if err != nil {
					log.Println(err)
					utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
					return
				}

				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "application/json")
				w.Write(encodedResponse)
				return
			}
		}
		if r.Method == "POST" {
			updateRequest := UpdateSnapshotRequest{}
			err := json.NewDecoder(r.Body).Decode(&updateRequest)
			if err != nil {
				log.Println(err)
				utils.WriteErrorResponse(w, err, http.StatusBadRequest)
				return
			}
			setSqlParts := make([]string, 0)
			if updateRequest.Note != nil {
				setSqlParts = append(setSqlParts, fmt.Sprintf("note = '%s'", *updateRequest.Note))
			}
			if updateRequest.Status != nil {
				setSqlParts = append(setSqlParts, fmt.Sprintf("status = '%s'", *updateRequest.Status))
			}
			if updateRequest.ImagePath != nil {
				setSqlParts = append(setSqlParts, fmt.Sprintf("image_path = '%s'", *updateRequest.ImagePath))
			}
			if updateRequest.MaskPath != nil {
				setSqlParts = append(setSqlParts, fmt.Sprintf("mask_path = '%s'", *updateRequest.MaskPath))
			}
			if updateRequest.Conclusion != nil {
				setSqlParts = append(setSqlParts, fmt.Sprintf("conclusion = '%s'", *updateRequest.Conclusion))
			}
			if updateRequest.Favorite != nil {
				setSqlParts = append(setSqlParts, fmt.Sprintf("favorite = %t", *updateRequest.Favorite))
			}

			setSql := strings.Join(setSqlParts, ",")
			if setSql == "" {
				err = fmt.Errorf("no fields to update are provided")
				utils.WriteErrorResponse(w, err, http.StatusBadRequest)
				return
			}
			query := fmt.Sprintf("UPDATE Snapshots SET %s WHERE id=%d", setSql, snapshotId)
			_, err = db.Exec(query)
			if err != nil {
				utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
				return
			}
			w.WriteHeader(http.StatusOK)
			return
		}
		err = fmt.Errorf("only POST and GET allowed")
		utils.WriteErrorResponse(w, err, http.StatusMethodNotAllowed)
	}
}
