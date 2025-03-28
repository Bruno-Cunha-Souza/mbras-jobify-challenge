package routes

import (
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/controllers"
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func setupJobRoutes(public fiber.Router) {
	jobs := public.Group("/jobs")

	jobs.Get("/", controllers.GetAllJobs)
	jobs.Get("/search", controllers.SearchJob)
	jobs.Get("/:id", controllers.GetJobID)

	jobs.Post("/:jobID/favorite", middleware.AuthMiddleware, controllers.FavoriteJobHandler)
	jobs.Delete("/:jobID/favorite", middleware.AuthMiddleware, controllers.UnfavoriteJobHandler)
	jobs.Get("/favorites/status/:jobID", middleware.AuthMiddleware, controllers.CheckFavoriteStatusHandler)

}
