FROM node:16-alpine3.14

COPY package.json .
COPY package-lock.json .

RUN npm install

CMD ["npm", "start"]