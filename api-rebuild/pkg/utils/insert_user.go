package utils

import (
	"database/sql"
	"fmt"
	"ml-xraylab/api-rebuild/pkg/models"
)

func InsertUser(db *sql.DB, user *models.User) (*models.User, error) {
	_, err := FindUserByUsername(db, user.Username)
	if err == nil {
		return nil, fmt.Errorf("user already exists")
	}

	query := fmt.Sprintf(
		"INSERT INTO Users(username, password, e_mail, role_id) VALUES ('%s', '%s', '%s', %d)",
		user.Username, user.Password, user.Email, user.RoleId,
	)
	result, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	result.Next()
	result.Close()

	return FindUserByUsername(db, user.Username)
}
