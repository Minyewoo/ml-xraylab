package utils

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

func CreateErrResponseMessage(err error) ([]byte, error) {
	errResponse := ErrorResponse{
		Error: err.Error(),
	}
	return json.Marshal(&errResponse)
}

func WriteErrorResponse(w http.ResponseWriter, err error, statusCode int) {
	responseBody, _ := CreateErrResponseMessage(err)
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseBody)
}
