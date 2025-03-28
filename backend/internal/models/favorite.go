package models

import "gorm.io/gorm"

type FavoriteJob struct {
	gorm.Model
	UserID uint `gorm:"index"`
	JobID  uint `gorm:"index"`
	User   User `gorm:"foreignKey:UserID"`
	Job    Job  `gorm:"foreignKey:JobID"`
}
