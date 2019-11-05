FROM node:12
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

WORKDIR /app
COPY . /app

RUN apt-get update && cd ui \
   && npm install \
   && npm install -g  @angular/cli \
   && ng build \
   && cd ../server \
   && npm install && npm run build

WORKDIR /app/server

ENV PORT 3010
ENV KAFKA_BROKERS kafka1:9092
ENV FLEET_MS_URL http://localhost:31000/fleetms
ENV ORDER_MS_URL http://localhost:10080/orders
ENV ORDER_QUERY_MS_URL  http://localhost:11080/orders
ENV VOYAGE_MS_URL http://localhost:3100/voyagems
EXPOSE 3010

CMD ["node", "dist/server/server.js"]
