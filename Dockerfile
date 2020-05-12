FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000
ENV MONGO_URL mongodb://localhost:27017/
CMD ["node", "web_server.js"]
