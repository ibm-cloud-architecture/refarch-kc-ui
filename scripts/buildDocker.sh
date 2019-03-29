#!/bin/bash
export LDFLAGS=-L/usr/local/opt/openssl/lib
export CPPFLAGS=-I/usr/local/opt/openssl/include
if [[ $PWD = */scripts ]]; then
 cd ..
fi
if [[ $# -eq 0 ]];then
  kcenv="local"
else
  kcenv=$1
fi

. ./scripts/setenv.sh
echo "##########################################"
echo " Build User Interface on $kcenv"
echo "##########################################"

tools=$(docker images | grep nodetools)
if [[ -z "$tools" ]]
then
   echo "Build with you npm and angular ng"
   cd ui && npm install && ng build && cd ../server && npm install && npm run build && cd ..
else
   echo "build with docker node tools image"
   docker run -v $(pwd):/home -ti ibmcase/nodetools bash -c "cd /home/ui  && npm install && ng build && cd ../server && npm install && npm run build"
fi
# TODO add CA certificate for icp or iks deployment

docker build -t ibmcase/$kname .
if [[ "$kcenv" != "local" ]]
then
    # image for private registry in IBM Cloud
    docker tag ibmcase/$kname us.icr.io/ibmcaseeda/$kname
fi
