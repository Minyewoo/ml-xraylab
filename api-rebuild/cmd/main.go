package main

import (
	"database/sql"
	"ml-xraylab/api-rebuild/pkg/config"
	"ml-xraylab/api-rebuild/pkg/server"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	cfg := config.ReadConfigFromEnvironment()

	db, err := sql.Open("mysql", "root:root@tcp(db:3306)/xraylab")
	if err != nil {
		panic(err)
	}
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	router := server.SetupRouter(db)

	server.Launch(router, cfg)
}
