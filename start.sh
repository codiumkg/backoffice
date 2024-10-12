#!/bin/bash

if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
else
  echo ".env.local file not found!"
  exit 1
fi

docker build --build-arg VITE_BASE_URL=$VITE_BASE_URL --target=dev  -t backoffice .

docker run --env-file .env.local -p 4000:4000 backoffice