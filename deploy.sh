#!/bin/bash

git pull
npm install
pm2 start index.js --name my-webhook
echo "Finished."
