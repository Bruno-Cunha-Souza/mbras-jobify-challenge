package controllers

import (
	"fmt"

	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/database"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/models"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/utils"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func UserRegister(c *fiber.Ctx) error {

	var input models.RegisterInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": fmt.Sprintf("erro ao parsear a requisicao: %v", err)})
	}

	if input.Email == "" || input.Password == "" || input.Name == "" {
		return c.Status(400).JSON(fiber.Map{"error": "campos obrigatorios ausentes"})
	}

	var count int64
	if err := database.DB.WithContext(c.Context()).Model(&models.User{}).
		Where("email = ?", input.Email).
		Count(&count).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "falha ao verificar existencia do e-mail"})
	}

	if count > 0 {
		return c.Status(409).JSON(fiber.Map{"error": "e-mail ja esta em uso"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "falha ao gerar hash da senha"})
	}

	newUser := models.User{
		Email:    input.Email,
		Name:     input.Name,
		Password: string(hashedPassword),
	}

	if err := database.DB.WithContext(c.Context()).Create(&newUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "falha ao criar o usuario"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "usuario criado com sucesso"})
}

func UserLogin(c *fiber.Ctx) error {
	var input models.LoginInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "erro ao parsear a requisição"})
	}

	var user models.User
	if err := database.DB.WithContext(c.Context()).Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "email ou senha inválidos"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "email ou senha inválidos"})
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "erro ao gerar token"})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "login realizado com sucesso",
		"token":   token,
	})
}
