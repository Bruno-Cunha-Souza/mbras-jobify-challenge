package services

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
)

type RemotiveResponse struct {
	Jobs []struct {
		ID              int    `json:"id"`
		Title           string `json:"title"`
		CompanyName     string `json:"company_name"`
		Category        string `json:"category"`
		CompanyLogo     string `json:"company_logo"`
		JobType         string `json:"job_type"`
		PublicationDate string `json:"publication_date"`
		Salary          string `json:"salary"`
		Description     string `json:"description"`
		URL             string `json:"url"`
	} `json:"jobs"`
}

func FetchJobsFromAPI() ([]models.Job, error) {
	resp, err := http.Get("https://remotive.com/api/remote-jobs")
	if err != nil {
		log.Println("Erro ao buscar vagas:", err)
		return nil, err
	}
	defer resp.Body.Close()

	var remotiveData RemotiveResponse
	if err := json.NewDecoder(resp.Body).Decode(&remotiveData); err != nil {
		log.Println("erro ao decodificar JSON:", err)
		return nil, err
	}

	var jobs []models.Job
	for _, job := range remotiveData.Jobs {
		jobs = append(jobs, models.Job{
			RemoteJobID:     job.ID,
			Title:           job.Title,
			CompanyName:     job.CompanyName,
			CompanyLogo:     job.CompanyLogo,
			JobType:         job.JobType,
			PublicationDate: job.PublicationDate,
			Salary:          job.Salary,
			Description:     job.Description,
			Category:        job.Category,
			URL:             job.URL,
		})
	}

	return jobs, nil
}
