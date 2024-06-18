#!/bin/bash
APP_NAME="mongodb-operators"  

# pm2 stop 

git pull origin main

npm install  

# success message
echo "Deployment completed successfully."
