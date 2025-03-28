package models

type Favorite struct {
	ID     uint `gorm:"primaryKey"`
	UserID uint
	JobID  uint
	User   User `gorm:"foreignKey:UserID"`
	Job    Job  `gorm:"foreignKey:JobID"`
}
