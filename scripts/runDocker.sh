# export KAFKA_BROKERS="kafka03-prod02.messagehub.services.us-south.bluemix.net:9093,kafka01-prod02.messagehub.services.us-south.bluemix.net:9093,kafka02-prod02.messagehub.services.us-south.bluemix.net:9093,kafka04-prod02.messagehub.services.us-south.bluemix.net:9093,kafka05-prod02.messagehub.services.us-south.bluemix.net:9093"
# export FLEET_MS_URL="http://169.61.93.29:30951/fleetms"

export FLEET_MS_URL="http://localhost:31300"
export ORDER_MS_URL="http://localhost:31200/orders"
export ORDER_QUERY_MS="http://localhost:31100/orders"
export VOYAGE_MS_URL="http://localhost:31000/voyages"

docker run -e FLEET_MS_URL --name kc-ui -p 3110:3010 ibmcase/kc-ui
