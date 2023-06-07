package utils

import (
	"database/sql"
	"fmt"
	"ml-xraylab/api-rebuild/pkg/models"
)

func InsertSnapshot(db *sql.DB, snapshot *models.Snapshot) (*models.Snapshot, error) {
	query := fmt.Sprintf(
		"INSERT INTO Snapshots(note, status, image_path, mask_path, conclusion, created_at, user_id, favorite) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', %d, %t)",
		snapshot.Note, snapshot.Status, snapshot.ImagePath, snapshot.MaskPath,
		snapshot.Conclusion, snapshot.CreatedAt.String(), snapshot.UserId, snapshot.Favorite,
	)
	result, err := db.Exec(query)
	if err != nil {
		return nil, err
	}

	insertedSnapshotId, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	return FindSnapshotById(db, int(insertedSnapshotId))
}
