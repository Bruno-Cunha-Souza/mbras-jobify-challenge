package utils

import (
	"errors"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func getJWTKey() ([]byte, error) {
	secret := os.Getenv("SECRET_KEY")
	if secret == "" {
		return nil, errors.New("SECRET_KEY nao configurada")
	}
	return []byte(secret), nil
}

func GenerateToken(userID uint) (string, error) {
	jwtKey, err := getJWTKey()
	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{
		"user_id": userID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func ValidateToken(tokenString string) (jwt.MapClaims, error) {
	jwtKey, err := getJWTKey()
	if err != nil {
		return nil, err
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("metodo de assinatura inesperado")
		}
		return jwtKey, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("token invalido")
}
