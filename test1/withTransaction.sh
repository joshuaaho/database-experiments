#!/bin/bash


ENDPOINT="http://localhost:3000/test1/withTransaction"


seq 1 200 | xargs -n1 -P0 -I{} curl -X POST "$ENDPOINT"
