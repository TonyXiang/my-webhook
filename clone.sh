#!/bin/bash

projectPath=$(cd `dirname $0`; pwd)
cd $projectPath
cd ../

git clone $1
echo "Finished."
