package utils

import (
	"fmt"
	"ml-xraylab/api-rebuild/pkg/models"
	"strings"
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

func ParseBearer(bearerToken string, jwtKey []byte) (*models.User, error) {
	tokenString := strings.Replace(bearerToken, "Bearer ", "", 1)
	token, err := jwt.ParseWithClaims(tokenString, &models.JwtClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("wrong signing method")
		}
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*models.JwtClaims); ok && token.Valid {
		return &models.User{
			Id:       claims.Id,
			Username: claims.Username,
			Email:    claims.Email,
		}, nil
	}

	return nil, fmt.Errorf("invalid auth token")
}
