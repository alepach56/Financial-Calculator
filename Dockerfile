FROM node:18

WORKDIR /ThreeCalc

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
