#!/bin/bash

ENDPOINT="http://localhost:3000/test3/leaveWorkJohn"
ENDPOINT2="http://localhost:3000/test3/leaveWorkMary"

# Run both curl commands in the background
curl -X POST "$ENDPOINT" &
curl -X POST "$ENDPOINT2" &

# Wait for both background processes to finish
wait