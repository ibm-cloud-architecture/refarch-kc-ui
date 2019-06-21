#!/bin/bash
export LDFLAGS=-L/usr/local/opt/openssl/lib
export CPPFLAGS=-I/usr/local/opt/openssl/include
if [[ $PWD = */scripts ]]; then
 cd ..
fi

source ../refarch-kc/scripts/setenv.sh $kcenv
echo "##########################################"
echo " Build User Interface on $kcenv"
echo "##########################################"

tools=$(docker images | grep nodetools)
if [[ -z "$tools" ]]
then
   echo "Build with your npm and angular ng"
   cd ui && npm install && ng build && cd ../server && npm install && npm run build && cd ..
else
   echo "build with docker node tools image"
   docker run -v $(pwd):/home -ti ibmcase/nodetools bash -c "cd /home/ui  && npm install && ng build && cd ../server && npm install && npm run build"
fi

