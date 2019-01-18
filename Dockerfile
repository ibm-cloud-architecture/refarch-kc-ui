FROM node:alpine
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

ADD . /kc-ui
WORKDIR /kc-ui/server

ENV PORT 3000
ENV KAFKA_BROKERS kafka03-prod02.messagehub.services.us-south.bluemix.net:9093,kafka01-prod02.messagehub.services.us-south.bluemix.net:9093,kafka02-prod02.messagehub.services.us-south.bluemix.net:9093,kafka04-prod02.messagehub.services.us-south.bluemix.net:9093,kafka05-prod02.messagehub.services.us-south.bluemix.net:9093
ENV FLEET_MS_URL http://169.61.93.29:30951/fleetms
ENV ORDER_MS_URL http://169.61.93.29:30951/orders
ENV ORDER_QUERY_MS_URL http://169.61.93.29:30951/orders
EXPOSE 3000

CMD node dist/server/server.js