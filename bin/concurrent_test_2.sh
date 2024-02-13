#!/bin/bash

# Number of concurrent requests
CONCURRENCY=10

# URL of the button click endpoint
URL="http://localhost:3000/transaction/handleButtonModifyClick"

# Function to send a single request
send_request() {
  curl -s -X POST "$URL" > /dev/null
}

# Run concurrent requests in the background
for i in $(seq 1 $CONCURRENCY); do
  send_request &
done


# Wait for all background jobs to finish
wait

echo "Concurrent requests completed"