#!/bin/bash

ENDPOINT="http://localhost:3000/test2/readOp"
ENDPOINT2="http://localhost:3000/test2/writeOp"

# Run both curl commands in the background
curl -X POST "$ENDPOINT" &
curl -X POST "$ENDPOINT2" &

# Wait for both background processes to finish
wait