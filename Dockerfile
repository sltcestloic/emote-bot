FROM node:16.11.0-buster
WORKDIR /usr/app
COPY package.json .
COPY prisma/ ./prisma/
RUN npm install --quiet
COPY . .
RUN npx prisma generate