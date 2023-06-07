package utils

import (
	"database/sql"
	"fmt"
	"ml-xraylab/api-rebuild/pkg/models"
)

func FindSnapshots(db *sql.DB, userId int) (*[]models.Snapshot, error) {
	query := fmt.Sprintf("SELECT * FROM Snapshots WHERE user_id=%d", userId)
	results, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer results.Close()

	snapshots := make([]models.Snapshot, 0)
	for results.Next() {
		snapshot := models.Snapshot{}
		err := results.Scan(
			&snapshot.Id,
			&snapshot.Note,
			&snapshot.Status,
			&snapshot.ImagePath,
			&snapshot.MaskPath,
			&snapshot.Conclusion,
			&snapshot.CreatedAt,
			&snapshot.UserId,
			&snapshot.Favorite,
		)
		if err != nil {
			// do something with error
		} else {
			snapshots = append(snapshots, snapshot)
		}
	}

	return &snapshots, nil
}

func FindSnapshotById(db *sql.DB, snapshotId int) (*models.Snapshot, error) {
	query := fmt.Sprintf("SELECT * FROM Snapshots WHERE id=%d", snapshotId)
	result, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer result.Close()
	result.Next()
	snapshot := models.Snapshot{}
	err = result.Scan(
		&snapshot.Id,
		&snapshot.Note,
		&snapshot.Status,
		&snapshot.ImagePath,
		&snapshot.MaskPath,
		&snapshot.Conclusion,
		&snapshot.CreatedAt,
		&snapshot.UserId,
		&snapshot.Favorite,
	)
	if err != nil {
		return nil, err
	}

	return &snapshot, nil
}
