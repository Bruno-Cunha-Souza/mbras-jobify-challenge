package models

import "time"

type Job struct {
	ID              uint `gorm:"primaryKey"`
	RemoteJobID     int  `gorm:"uniqueIndex"`
	Title           string
	CompanyName     string
	CompanyLogo     string
	JobType         string
	PublicationDate string
	Category        string
	URL             string
	Salary          string
	Description     string
	CreatedAt       time.Time `gorm:"autoCreateTime"`
	UpdatedAt       time.Time `gorm:"autoUpdateTime"`
}

type JobResponse struct {
	ID              uint      `json:"id"`
	Title           string    `json:"title"`
	CompanyName     string    `json:"company_name"`
	CompanyLogo     string    `json:"company_logo"`
	JobType         string    `json:"job_type"`
	PublicationDate string    `json:"publication_date"`
	Category        string    `json:"category"`
	Salary          string    `json:"salary"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type JobDetailsResponse struct {
	ID              uint   `json:"id"`
	Title           string `json:"title"`
	CompanyName     string `json:"company_name"`
	CompanyLogo     string `json:"company_logo"`
	JobType         string `json:"job_type"`
	PublicationDate string `json:"publication_date"`
	Category        string `json:"category"`
	Salary          string `json:"salary"`
	Description     string `json:"description"`
	URL             string `json:"url"`
}
