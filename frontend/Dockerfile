FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i --legacy-peer-deps

COPY . .

# RUN npm run build

CMD ["npm","start"]