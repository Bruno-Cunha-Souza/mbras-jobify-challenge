package routes

import (
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/controllers"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func setupLoginRoute(public fiber.Router) {
	user := public.Group("/user")

	user.Post("/login", controllers.UserLogin)
	user.Post("/Register", controllers.UserRegister)

	user.Get("/favorites", middleware.AuthMiddleware, controllers.ListFavoriteJobsHandler)
}
