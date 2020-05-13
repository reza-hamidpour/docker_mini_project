FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install express --save
RUN npm install mongodb --save 

COPY . .

EXPOSE 3000

CMD ["node", "web_server.js"]
