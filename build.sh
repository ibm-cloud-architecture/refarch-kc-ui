#!/bin/bash
cd ui
ng build
cd ../server
npm run build
cd ..
docker build -t ibmcase/kc-ui .