package cron

import (
	"fmt"
	"log"
	"time"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/services"
)

func FetchAndStoreJobs() {
	fmt.Println("Buscando novas vagas da Remotive...")

	jobs, err := services.FetchJobsFromAPI()
	if err != nil {
		log.Println("Erro ao obter vagas:", err)
		return
	}

	for _, job := range jobs {
		var existingJob models.Job
		result := database.DB.Where("remote_job_id = ?", job.RemoteJobID).First(&existingJob)
		if result.RowsAffected == 0 {
			database.DB.Create(&job)
		}
	}

	fmt.Println("Vagas atualizadas com sucesso!")
}

func StartJobFetcher() {
	go FetchAndStoreJobs()

	ticker := time.NewTicker(1 * time.Hour)
	defer ticker.Stop()

	for range ticker.C {
		go FetchAndStoreJobs()
	}
}
