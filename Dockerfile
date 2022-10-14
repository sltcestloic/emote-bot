FROM node:16.11.0-buster
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
