package utils

import (
	"ml-xraylab/api-rebuild/pkg/models"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func CreateNewJwtToken(user *models.User, jwtKey []byte) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &models.JwtClaims{
		Id:       user.Id,
		Username: user.Username,
		Email:    user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
