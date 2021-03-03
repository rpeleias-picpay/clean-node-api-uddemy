FROM node:15
WORKDIR /usr/src/clean-node-api-udemy
COPY ./package.json .
RUN npm install --only=prod