FROM node:16
WORKDIR /ikbo-01-20-semyon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start