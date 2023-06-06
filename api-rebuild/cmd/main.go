package main

import (
	"database/sql"
	"ml-xraylab/api-rebuild/pkg/config"
	"ml-xraylab/api-rebuild/pkg/server"
	"time"
)

func main() {
	cfg := config.ReadConfigFromEnvironment()

	db, err := sql.Open("mysql", "user:password@/dbname")
	if err != nil {
		panic(err)
	}
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	router := server.SetupRouter(db)

	server.Launch(router, cfg)
}
