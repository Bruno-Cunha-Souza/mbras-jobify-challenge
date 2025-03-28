package middleware

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/golang-jwt/jwt/v5"
)

func SetupMiddleware(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("ALLOWED_ORIGINS"),
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))
}
func AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		secret := os.Getenv("SECRET_KEY")
		tokenString := c.Get("Authorization")

		if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
			return c.Status(401).JSON(fiber.Map{"error": "token inválido ou não fornecido"})
		}
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("método de assinatura inválido")
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "token inválido"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(401).JSON(fiber.Map{"error": "erro ao processar token"})
		}

		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			return c.Status(401).JSON(fiber.Map{"error": "user_id inválido no token"})
		}
		userID := uint(userIDFloat)

		c.Locals("userID", userID)
		return c.Next()
	}
}
