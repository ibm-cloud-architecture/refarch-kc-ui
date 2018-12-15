#!/bin/bash
set p = $(echo $PWD | awk -v h="scripts" '$0 ~h')
if [[ $PWD = */scripts ]]; then
 cd ..
fi
cd ui
ng build
cd ../server
npm run build
cd ..
docker build -t ibmcase/kc-ui .