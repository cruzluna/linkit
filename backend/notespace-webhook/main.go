package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	svix "github.com/svix/svix-webhooks/go"

	"github.com/joho/godotenv"
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
	fmt.Printf("\x1b[%dm%s\x1b[0m", 34, "SERVER STARTED\n")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// var clerkEndpoint string = os.Getenv("CLERK_TEST_ENDPOINT")

	secret := os.Getenv("SIGN_SECRET_TEST")

	wh, err := svix.NewWebhook(secret)
	if err != nil {
		fmt.Println("ERROR WH")
		log.Fatal(err)
	}

	// handle endpoint
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("MADE IT IN here 2")
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

		// Do something with the message...

		// CREATE A struct with eventtype, clerkID, username
		var dat ClerkHookStruct

		if err := json.Unmarshal(payload, &dat); err != nil {
			panic(err)
		}
		// dat.Data.Username
		data, _ := json.Marshal(dat)
		fmt.Println(string(data))
		fmt.Println("DATA: ", dat)

		w.WriteHeader(http.StatusNoContent)
	})

	httpErr := http.ListenAndServe(":3000", nil)
	fmt.Println("ERROR: ", httpErr)

	// 1. Listen for webhook post

	// 2. Upsert user username , leave create field empty
	// user clerkID to write to DB
}
