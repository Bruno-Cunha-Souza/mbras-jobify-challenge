package routes

import (
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	middleware.SetupMiddleware(app)

	api := app.Group("/api")
	setupLoginRoute(api)
	setupJobRoutes(api)

}
