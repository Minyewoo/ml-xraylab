package routes

import (
	"database/sql"
	"encoding/json"
	"log"
	"ml-xraylab/api-rebuild/pkg/utils"
	"net/http"
)

func GetUserSnapshots(db *sql.DB, jwtKey []byte) func(w http.ResponseWriter, r *http.Request) {
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

		snapshots, err := utils.FindSnapshots(db, user.Id)
		if err != nil {
			log.Println(err)
			utils.WriteErrorResponse(w, err, http.StatusInternalServerError)
			return
		}

		encodedResponse, err := json.Marshal(snapshots)
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
