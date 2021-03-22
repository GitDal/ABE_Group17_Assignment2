FROM node:14.15.4
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY src /app/src

RUN npm install
RUN npm run build

CMD node ./dist/app.js