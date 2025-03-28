package controllers

import (
	"strconv"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func ToggleFavorite(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	jobIDStr := c.Params("jobID")

	jobID, err := strconv.ParseUint(jobIDStr, 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "ID da vaga inválido"})
	}

	var favorite models.FavoriteJob
	err = database.DB.Where("user_id = ? AND job_id = ?", userID, jobID).First(&favorite).Error

	if err == nil {
		if err := database.DB.Delete(&favorite).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "erro ao remover dos favoritos"})
		}
		return c.Status(200).JSON(fiber.Map{"message": "vaga removida dos favoritos"})
	}

	if err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{"error": "erro ao verificar favoritos"})
	}

	newFavorite := models.FavoriteJob{UserID: userID, JobID: uint(jobID)}
	if err := database.DB.Create(&newFavorite).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "erro ao adicionar aos favoritos"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "vaga adicionada aos favoritos"})
}

func GetFavoriteJobs(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)

	var favoriteJobs []models.Job
	err := database.DB.Joins("JOIN favorite_jobs ON favorite_jobs.job_id = jobs.id").
		Where("favorite_jobs.user_id = ?", userID).
		Find(&favoriteJobs).Error

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "erro ao buscar vagas favoritas"})
	}

	return c.Status(200).JSON(fiber.Map{"favorites": favoriteJobs})
}
