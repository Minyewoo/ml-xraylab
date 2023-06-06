package inference

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"ml-xraylab/api-rebuild/pkg/config"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type SnapshotProcessingEvent struct {
	SnapshotId   int    `json:"snapshot_id"`
	SnapshotPath string `json:"snapshot_path"`
}

func SendEventForInference(snapshotId int, snapshotPath string) error {
	apiConfig := config.ReadConfigFromEnvironment()
	conn, err := amqp.Dial(fmt.Sprintf("amqp://guest:guest@%s:5672/", apiConfig.RabbitMqHost))
	if err != nil {
		return err
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	err = ch.ExchangeDeclare(
		apiConfig.InferenceExchangeName, // name
		"fanout",                        // type
		true,                            // durable
		false,                           // auto-deleted
		false,                           // internal
		false,                           // no-wait
		nil,                             // arguments
	)
	if err != nil {
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	event := SnapshotProcessingEvent{
		SnapshotId:   snapshotId,
		SnapshotPath: snapshotPath,
	}

	message, err := json.Marshal(event)
	if err != nil {
		return err
	}

	err = ch.PublishWithContext(
		ctx,
		apiConfig.InferenceExchangeName, // exchange
		"",                              // routing key
		false,                           // mandatory
		false,                           // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		},
	)
	if err != nil {
		return err
	}

	log.Printf("Sent: %s, in %s", message, apiConfig.InferenceExchangeName)
	return nil
}
