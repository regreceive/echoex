#!/usr/bin/env bash

git pull && \
yarn install && \
yarn build --release && \
cd build && \
cp ../echosystem.config.js . && \
pm2 reload 0