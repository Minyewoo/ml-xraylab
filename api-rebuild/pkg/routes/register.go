package routes

import (
	"database/sql"
	"encoding/json"
	"log"
	"ml-xraylab/api-rebuild/pkg/models"
	utils "ml-xraylab/api-rebuild/pkg/utils"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegistrationResponse struct {
	Response string `json:"response"`
	Token    string `json:"token"`
}

func Register(db *sql.DB, jwtKey []byte) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		defaultRoleId := 3
		var creds Credentials
		err := json.NewDecoder(r.Body).Decode(&creds)
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

		user, err := utils.InsertUser(db, &models.User{
			Username: creds.Username,
			Email:    creds.Email,
			Password: string(hashedPassword),
			RoleId:   defaultRoleId,
		})
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusBadRequest)
			return
		}

		tokenString, err := utils.CreateNewJwtToken(user, jwtKey)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}

		registrationResponse := RegistrationResponse{
			Response: "User successfully registered!",
			Token:    tokenString,
		}

		encodedResponse, err := json.Marshal(&registrationResponse)
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
