package controllers

import (
	"strconv"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"github.com/gofiber/fiber/v2"
)

// Favoritar uma vaga
func FavoriteJobHandler(c *fiber.Ctx) error {
	// Obtém o userID do contexto (passado pelo middleware)
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
	}

	// Obtém o jobID da URL
	jobID, err := strconv.ParseUint(c.Params("jobID"), 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "ID da vaga inválido"})
	}

	// Verifica se o usuário já favoritou essa vaga
	var existingFavorite models.Favorite
	if err := database.DB.Where("user_id = ? AND job_id = ?", userID, jobID).First(&existingFavorite).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"error": "Você já favoritou esta vaga"})
	}

	// Cria um novo favorito
	favorite := models.Favorite{
		UserID: uint(userID),
		JobID:  uint(jobID),
	}

	if err := database.DB.Create(&favorite).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao favoritar a vaga"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Vaga favoritada com sucesso"})
}

// Desfavoritar uma vaga
func UnfavoriteJobHandler(c *fiber.Ctx) error {
	// Obtém o userID do contexto
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
	}

	// Obtém o jobID da URL
	jobID, err := strconv.ParseUint(c.Params("jobID"), 10, 64)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "ID da vaga inválido"})
	}

	// Verifica se o usuário realmente favoritou essa vaga
	var favorite models.Favorite
	if err := database.DB.Where("user_id = ? AND job_id = ?", userID, jobID).First(&favorite).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Você não favoritou esta vaga"})
	}

	// Remove o favorito
	if err := database.DB.Delete(&favorite).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao desfavoritar a vaga"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Vaga desfavoritada com sucesso"})
}

// Listar todas as vagas favoritas de um usuário
func ListFavoriteJobsHandler(c *fiber.Ctx) error {
	// Obtém o userID do contexto
	userID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
	}

	// Busca as vagas favoritas do usuário
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
