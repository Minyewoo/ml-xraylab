package utils

import (
	"database/sql"
	"fmt"
	"ml-xraylab/api-rebuild/pkg/models"
)

func FindUserByUsername(db *sql.DB, username string) (*models.User, error) {
	query := fmt.Sprintf("SELECT id, username, e_mail, password, role_id FROM Users WHERE username = %s", username)
	result, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer result.Close()

	var user models.User
	err = result.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.RoleId)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
