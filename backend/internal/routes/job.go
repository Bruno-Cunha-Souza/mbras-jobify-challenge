package routes

import (
	"github.com/Bruno-Cunha-Souza/Jobify/backend/internal/controllers"
	"github.com/gofiber/fiber/v2"
)

func setupJobRoutes(public fiber.Router) {
	jobs := public.Group("/jobs")

	jobs.Get("/", controllers.GetAllJobs)
	jobs.Get("/search", controllers.SearchJob)
	jobs.Get("/:id", controllers.GetJobID)
}
