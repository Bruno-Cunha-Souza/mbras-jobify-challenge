package database

import (
	"fmt"
	"log"
	"os"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("erro ao conectar ao banco de dados:", err)
	}

	DB.AutoMigrate(&models.User{}, &models.LoginInput{}, &models.RegisterInput{}, &models.Job{}, &models.JobResponse{}, &models.JobDetailsResponse{}, &models.FavoriteJob{})

}
