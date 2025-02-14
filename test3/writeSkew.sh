#!/bin/bash

ENDPOINT="http://localhost:3000/test4/interleaveOp1"
# ENDPOINT2="http://localhost:3000/test4/interleaveOp2"

# Run both curl commands in the background
curl -X POST "$ENDPOINT" 
# curl -X POST "$ENDPOINT2" &

# # Wait for both background processes to finish
# wait