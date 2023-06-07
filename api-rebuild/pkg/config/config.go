package config

import (
	"os"

	"github.com/joho/godotenv"
)

type ApiConfig struct {
	RabbitMqHost          string
	InferenceExchangeName string
	ServingAddress        string
}

func ReadConfigFromEnvironment() *ApiConfig {
	godotenv.Load()
	return &ApiConfig{
		RabbitMqHost:          getEnvOrDefault("RABBITMQ_HOST", "localhost"),
		InferenceExchangeName: getEnvOrDefault("INFERENCE_EXCHANGE_NAME", "inference"),
		ServingAddress:        getEnvOrDefault("SERVING_ADDRESS", "0.0.0.0:5000"),
	}
}

func getEnvOrDefault(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}
