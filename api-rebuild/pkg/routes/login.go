package routes

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	utils "ml-xraylab/api-rebuild/pkg/utils"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type LoginCredentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Response string `json:"response"`
	Token    string `json:"token"`
}

func Login(db *sql.DB, jwtKey []byte) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var creds LoginCredentials
		err := json.NewDecoder(r.Body).Decode(&creds)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
			return
		}

		user, err := utils.FindUserByUsername(db, creds.Username)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.MinCost)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}

		if user.Password != string(hashedPassword) {
			err = fmt.Errorf("wrong password")
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
		}

		tokenString, err := utils.CreateNewJwtToken(user, jwtKey)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}

		loginResponse := LoginResponse{
			Response: "Logged in successfully!",
			Token:    tokenString,
		}

		encodedResponse, err := json.Marshal(&loginResponse)
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
