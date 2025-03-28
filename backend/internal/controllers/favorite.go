package controllers

import (
	"strconv"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"github.com/gofiber/fiber/v2"
)

func ToggleFavoriteJobHandler(c *fiber.Ctx) error {
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
	}

	jobID, err := strconv.ParseUint(c.Params("jobID"), 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "ID da vaga inválido"})
	}

	var favorite models.Favorite
	if err := database.DB.Where("user_id = ? AND job_id = ?", userID, jobID).First(&favorite).Error; err == nil {

		if err := database.DB.Delete(&favorite).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Erro ao desfavoritar a vaga"})
		}
		return c.Status(200).JSON(fiber.Map{"message": "Vaga desfavoritada com sucesso"})
	}

	newFavorite := models.Favorite{
		UserID: uint(userID),
		JobID:  uint(jobID),
	}

	if err := database.DB.Create(&newFavorite).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao favoritar a vaga"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Vaga favoritada com sucesso"})
}

func ListFavoriteJobsHandler(c *fiber.Ctx) error {
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
	}

	var favoriteJobs []models.Job
	if err := database.DB.
		Joins("JOIN favorites ON jobs.id = favorites.job_id").
		Where("favorites.user_id = ?", userID).
		Find(&favoriteJobs).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao buscar vagas favoritas"})
	}

	return c.Status(200).JSON(fiber.Map{"favorites": favoriteJobs})
}

func CheckFavoriteStatusHandler(c *fiber.Ctx) error {
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
	}

	jobID, err := strconv.ParseUint(c.Params("jobID"), 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "ID da vaga inválido"})
	}

	var favorite models.Favorite
	if err := database.DB.Where("user_id = ? AND job_id = ?", userID, jobID).First(&favorite).Error; err != nil {
		return c.Status(200).JSON(fiber.Map{"isFavorited": false})
	}

	return c.Status(200).JSON(fiber.Map{"isFavorited": true})
}
