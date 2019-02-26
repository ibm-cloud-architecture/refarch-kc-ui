FROM node:11
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

COPY . /kc_ui
WORKDIR /kc_ui/server


ENV PORT 3010
ENV KAFKA_BROKERS kafka03-prod02.messagehub.services.us-south.bluemix.net:9093,kafka01-prod02.messagehub.services.us-south.bluemix.net:9093,kafka02-prod02.messagehub.services.us-south.bluemix.net:9093,kafka04-prod02.messagehub.services.us-south.bluemix.net:9093,kafka05-prod02.messagehub.services.us-south.bluemix.net:9093
ENV FLEET_MS_URL http://169.61.93.29:30951/fleetms
ENV ORDER_MS_URL http://169.61.93.29:30951/orders
ENV VOYAGE_MS_URL http://kcsolution:3100/voyagems
EXPOSE 3010

CMD node dist/server/server.js