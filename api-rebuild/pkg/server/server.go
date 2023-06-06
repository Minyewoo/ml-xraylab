package server

import (
	"fmt"
	"log"
	"ml-xraylab/api-rebuild/pkg/config"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func Launch(r *mux.Router, cfg *config.ApiConfig) {
	fmt.Printf("Starting server at %s\n", cfg.ServingAddress)
	if err := http.ListenAndServe(cfg.ServingAddress, r); err != nil {
		log.Fatal(err)
	}
}
