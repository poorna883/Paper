FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build 

EXPOSE 5000
RUN chmod +x src/app.js
CMD src/app.js