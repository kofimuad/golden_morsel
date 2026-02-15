FROM node:18-alpine

WORKDIR /app

COPY goldenmorsel-backend/package*.json ./

RUN npm install

COPY goldenmorsel-backend/src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]