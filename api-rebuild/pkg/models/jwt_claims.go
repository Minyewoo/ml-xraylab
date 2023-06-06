package models

import (
	"github.com/golang-jwt/jwt/v4"
)

type JwtClaims struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}
