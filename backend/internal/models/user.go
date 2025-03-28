package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email     string `gorm:"unique"`
	Password  string `gorm:"type:varchar(64);not null"`
	Name      string
	Favorites []Favorite `gorm:"foreignKey:UserID"`
}

type RegisterInput struct {
	Email    string `gorm:"unique"`
	Password string `gorm:"type:varchar(64);not null"`
	Name     string
}

type LoginInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}
