package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/apache/pulsar-client-go/pulsar"
)

func main() {
	consumerName := flag.String("name", "consumer-1", "Nome do consumidor")
	flag.Parse()

	client, err := pulsar.NewClient(pulsar.ClientOptions{
		URL: os.Getenv("PULSAR_SERVICE_URL"),

	})
	if err != nil {
		log.Fatalf("Erro ao criar cliente Pulsar: %v", err)
	}
	defer client.Close()

	consumer, err := client.Subscribe(
		pulsar.ConsumerOptions{
			Topic:            "my-topic",
			SubscriptionName: "my-subscription",
			Type:             pulsar.KeyShared,
			Name:             *consumerName,
			// KeySharedPolicy: &pulsar.KeySharedPolicy{AllowOutOfOrderDelivery: true },
		})

	if err != nil {
		log.Fatalf("Erro ao criar consumidor: %v", err)
	}
	defer consumer.Close()

	fmt.Printf("Consumidor %s iniciado e aguardando mensagens...\n", *consumerName)

	for {
		msg, err := consumer.Receive(context.Background())
		if err != nil {
			log.Printf("Erro ao receber mensagem: %v", err)
			continue
		}

		fmt.Printf("[%s] Mensagem recebida: ID=%v, key=%v, Payload=%s\n", *consumerName, msg.ID(), msg.Key(), string(msg.Payload()))
		if msg.Key() == "fixed-key" { // Delay to simulate slow performance for fixed keys
			time.Sleep(1 * time.Second)
		}

		consumer.Ack(msg)
	}
}
