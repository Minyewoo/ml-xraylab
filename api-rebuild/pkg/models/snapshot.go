package models

import "time"

type Snapshot struct {
	Id         int
	Note       string
	Status     string
	ImagePath  string
	MaskPath   string
	Conclusion string
	CreatedAt  time.Time
	UserId     int
	Favorite   bool
}
