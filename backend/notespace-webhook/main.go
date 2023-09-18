package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"notespace/webhook/internal/database"
	"os"
	"time"

	"github.com/joho/godotenv"
	svix "github.com/svix/svix-webhooks/go"
)

type ClerkHookStruct struct {
	Data struct {
		CreatedAt int64  `json:"created_at"`
		ID        string `json:"id"`
		UpdatedAt int64  `json:"updated_at"`
		Username  string `json:"username"`
	} `json:"data"`
	Object string `json:"object"`
	Type   string `json:"type"`
}

func main() {
	fmt.Printf("\x1b[%dm%s\x1b[0m", 34, "SERVER STARTED ")

	serverEnv := os.Getenv("SERVER_ENV")
	fmt.Println("Environment: ", serverEnv)

	if serverEnv == "" || serverEnv == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Declare context
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	// Spin up database
	dsn := os.Getenv("DSN")

	db, err := database.StartDatabase(ctx, dsn)
	if err != nil {
		fmt.Println(err)
	}
	defer db.CloseDatabase()

	// Test database

	secret := os.Getenv("SIGN_SECRET_TEST")

	wh, err := svix.NewWebhook(secret)
	if err != nil {
		log.Fatal(err)
	}

	// handle endpoint
	// 1. Listen for webhook post
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("NEW POST REQUEST")
		headers := r.Header

		payload, err := io.ReadAll(r.Body)
		if err != nil {
			fmt.Print("ERROR 1", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = wh.Verify(payload, headers)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// CREATE A struct with eventtype, clerkID, username
		var dat ClerkHookStruct

		if err := json.Unmarshal(payload, &dat); err != nil {
			fmt.Println(err)
		}

		// user clerkID to write to DB
		usernameErr := db.UpdateUsername(ctx, dat.Data.Username, dat.Data.ID)

		if usernameErr != nil {
			fmt.Println(usernameErr)
		}
		// dat.Data.Username
		data, _ := json.Marshal(dat)
		fmt.Println(string(data))
		fmt.Println("DATA: ", dat)

		w.WriteHeader(http.StatusNoContent)
	})

	httpErr := http.ListenAndServe(":3000", nil)
	if errors.Is(httpErr, http.ErrServerClosed) {
		fmt.Println("Server closed")
	} else if httpErr != nil {
		fmt.Println("Error Starting server: ", httpErr)
	}
}
