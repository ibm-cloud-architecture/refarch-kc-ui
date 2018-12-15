FROM node:alpine
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

ADD . /kc-ui
WORKDIR /kc-ui/server

ENV PORT 3000
EXPOSE 3000

CMD node dist/server/server.js