#!/bin/bash
export LDFLAGS=-L/usr/local/opt/openssl/lib
export CPPFLAGS=-I/usr/local/opt/openssl/include
export msname="kcontainer-ui"
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

docker build -t ibmcase/$msname .
