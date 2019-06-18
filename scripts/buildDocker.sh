#!/bin/bash
export LDFLAGS=-L/usr/local/opt/openssl/lib
export CPPFLAGS=-I/usr/local/opt/openssl/include
export msname="kc-ui"
export chart=$(ls ./chart/| grep $msname)
export kname=$chart
export ns="greencompute"
if [[ $PWD = */scripts ]]; then
 cd ..
fi
if [[ $# -eq 0 ]];then
  kcenv="LOCAL"
else
  kcenv=$1
fi

source ../refarch-kc/scripts/setenv.sh $kcenv
echo "##########################################"
echo " Build User Interface on $kcenv"
echo "##########################################"

docker build -t ibmcase/$kname .
if [[ "$kcenv" == "IBMCLOUD" ]]
then
    # image for private registry in IBM Cloud
    docker tag ibmcase/$kname us.icr.io/ibmcaseeda/$kname
fi
