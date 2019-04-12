#!/bin/bash
export LDFLAGS=-L/usr/local/opt/openssl/lib
export CPPFLAGS=-I/usr/local/opt/openssl/include
if [[ $PWD = */scripts ]]; then
 cd ..
fi
if [[ $# -eq 0 ]];then
  kcenv="LOCAL"
else
  kcenv=$1
fi

. ./scripts/setenv.sh $kcenv
echo "##########################################"
echo " Build User Interface on $kcenv"
echo "##########################################"

docker build -t ibmcase/$kname .
if [[ "$kcenv" != "LOCAL" ]]
then
    # image for private registry in IBM Cloud
    docker tag ibmcase/$kname us.icr.io/ibmcaseeda/$kname
fi
