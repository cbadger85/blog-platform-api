FROM node:12.8

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 7777

CMD ["npm", "start"]