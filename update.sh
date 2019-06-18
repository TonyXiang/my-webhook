#!/bin/bash

projectPath=$(cd `dirname $0`; pwd)

cd $projectPath
cd ../
cd $1

git pull
echo "Finished."
