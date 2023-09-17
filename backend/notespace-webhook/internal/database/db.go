package database

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	DB *sqlx.DB
}

func StartDatabase(ctx context.Context, dataSource string) (*Database, error) {
	db, err := sqlx.ConnectContext(ctx, "mysql", dataSource)
	if err != nil {
		fmt.Println("Couldn't start db.\n", err)
		return nil, err
	}

	database := &Database{
		DB: db,
	}

	return database, nil
}

func (db *Database) CloseDatabase() error {
	return db.DB.Close()
}

func (db *Database) UpdateUsername(ctx context.Context, newUsername string, clerkId string) error {
	var update string = "UPDATE User set username=? WHERE clerkId=?"
	res, err := db.DB.ExecContext(ctx, update, newUsername, clerkId)
	if err != nil {
		fmt.Println(err)
		return err
	}
	fmt.Println("INSERTED: ", res)

	return nil
}
