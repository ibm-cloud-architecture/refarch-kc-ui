export KAFKA_BROKERS="localhost:9092"
export FLEET_MS_URL="http://localhost:9080/fleetms"

docker run --name kc-ui -p 3000:3000 ibmcase/kc-ui
