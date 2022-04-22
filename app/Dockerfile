# FROM node:17-alpine3.14

# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install

# CMD ["npm", "start"]
FROM node:16

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]