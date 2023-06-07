package server

import (
	"fmt"
	"log"
	"ml-xraylab/api-rebuild/pkg/config"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func Launch(r *mux.Router, cfg *config.ApiConfig) {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"HEAD", "GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})
	handler := c.Handler(r)

	fmt.Printf("Starting server at %s\n", cfg.ServingAddress)
	if err := http.ListenAndServe(cfg.ServingAddress, handler); err != nil {
		log.Fatal(err)
	}
}
