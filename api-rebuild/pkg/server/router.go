package server

import (
	"database/sql"
	"ml-xraylab/api-rebuild/pkg/routes"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRouter(db *sql.DB) *mux.Router {
	r := mux.NewRouter()
	jwtKey := []byte("secret")

	// r.HandleFunc("/add_mask/{snapshot_id}").Methods("POST")
	// r.HandleFunc("/add_predictions/{snapshot_id}").Methods("POST")
	r.HandleFunc("/login", routes.Login(db, jwtKey)).Methods("POST")
	r.HandleFunc("/register", routes.Register(db, jwtKey)).Methods("POST")
	// r.HandleFunc("/home").Methods("GET")
	// r.HandleFunc("/home/update").Methods("POST")
	r.HandleFunc("/home/upload_image", routes.UploadImage(db, jwtKey)).Methods("POST")
	r.HandleFunc("/home/user_snapshots", routes.GetUserSnapshots(db, jwtKey)).Methods("GET")
	r.HandleFunc("/home/user_snapshots/{id:[0-9]+}", routes.UserSnapshotById(db, jwtKey)).Methods("POST", "GET")

	fileServer := http.FileServer(http.Dir("./static/"))
	r.PathPrefix("/files/").Handler(http.StripPrefix("/files/", fileServer))
	return r
}
