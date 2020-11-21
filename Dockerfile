FROM node:15.0.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

CMD [ "node", "app.js" ]