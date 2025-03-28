package controllers

import (
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"github.com/gofiber/fiber/v2"
)

const PageSize = 8

func GetAllJobs(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	if page < 1 {
		page = 1
	}

	var totalCount int64
	if err := database.DB.Model(&models.Job{}).Count(&totalCount).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Falha ao contar vagas"})
	}

	offset := (page - 1) * PageSize

	var jobs []models.JobResponse

	query := database.DB.WithContext(c.Context()).
		Model(&models.Job{}).
		Select("jobs.id, jobs.remote_job_id, jobs.title, jobs.company_name, jobs.company_logo, jobs.job_type, jobs.publication_date, jobs.category, jobs.url, jobs.salary, jobs.description, jobs.created_at, jobs.updated_at")

	query = query.Offset(offset).Limit(PageSize).Order("updated_at DESC")

	if err := query.Find(&jobs).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Falha ao buscar vagas"})
	}

	totalPages := (int(totalCount) + PageSize - 1) / PageSize

	return c.Status(200).JSON(fiber.Map{
		"jobs":       jobs,
		"page":       page,
		"totalPages": totalPages,
	})
}

func SearchJob(c *fiber.Ctx) error {
	searchParam := c.Query("search", "")
	page := c.QueryInt("page", 1)

	if page < 1 {
		page = 1
	}

	var totalCount int64

	if err := database.DB.Model(&models.Job{}).
		Where("title ILIKE ? OR company_name ILIKE ? OR category ILIKE ?",
			"%"+searchParam+"%", "%"+searchParam+"%", "%"+searchParam+"%").
		Count(&totalCount).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Falha ao contar vagas"})
	}

	offset := (page - 1) * PageSize

	var jobs []models.JobResponse

	query := database.DB.WithContext(c.Context()).
		Model(&models.Job{}).
		Select("id, title, company_name, company_logo, job_type, publication_date, category, salary").
		Where("title ILIKE ? OR company_name ILIKE ? OR category ILIKE ?",
			"%"+searchParam+"%", "%"+searchParam+"%", "%"+searchParam+"%").
		Order("updated_at DESC")

	if totalCount > PageSize {
		query = query.Offset(offset).Limit(PageSize)
	}

	if err := query.Find(&jobs).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Falha ao buscar vagas"})
	}

	totalPages := 1
	if totalCount > PageSize {
		totalPages = int((totalCount + PageSize - 1) / PageSize)
	}

	return c.Status(200).JSON(fiber.Map{
		"jobs":       jobs,
		"page":       page,
		"totalPages": totalPages,
	})
}

func GetJobID(c *fiber.Ctx) error {
	jobID := c.Params("id")

	var job models.JobDetailsResponse

	if err := database.DB.WithContext(c.Context()).
		Model(&models.Job{}).
		Where("id = ?", jobID).
		First(&job).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "vaga não encontrada"})
	}

	return c.Status(200).JSON(job)
}
