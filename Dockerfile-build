FROM node:11 as builder

WORKDIR "/app"
ADD . /app
RUN apt-get update && cd ui \
   && npm install \
   && npm install -g  @angular/cli \
   && ng build \
   && cd ../server \
   && npm install && npm run build

FROM node:alpine
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

WORKDIR /kc-ui/server
COPY --from=builder /app ..

ENV PORT 3010
ENV KAFKA_BROKERS kafka03-prod02.messagehub.services.us-south.bluemix.net:9093,kafka01-prod02.messagehub.services.us-south.bluemix.net:9093,kafka02-prod02.messagehub.services.us-south.bluemix.net:9093,kafka04-prod02.messagehub.services.us-south.bluemix.net:9093,kafka05-prod02.messagehub.services.us-south.bluemix.net:9093
ENV FLEET_MS_URL http://169.61.93.29:30951/fleetms
ENV ORDER_MS_URL http://169.61.93.29:30951/orders
ENV VOYAGE_MS_URL http://kcsolution:3100/voyagems
EXPOSE 3010

CMD node dist/server/server.js