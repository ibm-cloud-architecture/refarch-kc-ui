#!/bin/bash
export KAFKA_BROKERS="localhost:9092"
export FLEET_MS_URL="http://localhost:9080/fleetms"
cd ./server
npm start