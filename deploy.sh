#!/bin/bash

projectPath=$(cd `dirname $0`; pwd)

echo "==> go projectPath"
cd $projectPath

npm install
pm2 restart my-webhook

echo "Finished."
