package main

import (
	"log"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/cron"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Erro ao carregar .env: %v", err)
	}

	database.ConnectDB()

	go cron.StartJobFetcher()

	app := fiber.New()
	routes.SetupRoutes(app)

	if err := app.Listen(":5000"); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
