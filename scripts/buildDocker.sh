#!/bin/bash
export LDFLAGS=-L/usr/local/opt/openssl/lib
export CPPFLAGS=-I/usr/local/opt/openssl/include
if [[ $PWD = */scripts ]]; then
 cd ..
fi

tools=$(docker images | grep nodetools)
if [[ -z "$tools" ]]
then
   cd ui && npm install && ng build && cd ../server && npm install && npm run build && cd ..
else
   echo "build with docker node tools image"
   docker run -v $(pwd):/home -ti ibmcase/nodetools bash -c "cd /home/ui  && npm install && ng build && cd ../server && npm install && npm run build"
fi
# TODO add CA certificate for icp or iks deployment

docker build -t ibmcase/kc-ui .
if [[ $kcenv -ne "local" ]]
then
    # image for private registry in IBM Cloud
    docker tag ibmcase/kc-ui registry.ng.bluemix.net/ibmcaseeda/kc-ui
fi
