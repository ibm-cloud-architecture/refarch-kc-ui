FROM node:alpine
MAINTAINER https://github.com/ibm-cloud-architecture - IBM - Jerome Boyer

COPY . /kc-ui
WORKDIR /kc-ui

# RUN npm install && \
#     npm install -g @angular/cli && \
#    npm run build

EXPOSE 3000

CMD node server/server.js