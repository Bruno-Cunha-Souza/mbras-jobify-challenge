package routes

import (
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/controllers"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func setupFavoriteRoutes(public fiber.Router) {
	fav := public.Group("/favorites")

	fav.Post("/:jobID/favorite", middleware.AuthMiddleware(), controllers.ToggleFavorite)
	fav.Get("/favorites", middleware.AuthMiddleware(), controllers.GetFavoriteJobs)

}
