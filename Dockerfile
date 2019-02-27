FROM node:11
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

COPY . /kc_ui
WORKDIR /kc_ui/server


ENV PORT 3010
ENV KAFKA_BROKERS kafka1:9092
ENV FLEET_MS_URL http://localhost:9080/fleetms
ENV ORDER_MS_URL http://localhost:30951/orders
ENV VOYAGE_MS_URL http://kcsolution:3100/voyagems
EXPOSE 3010

CMD node dist/server/server.js