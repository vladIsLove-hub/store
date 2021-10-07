FROM node:14.17.1-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start:prod"]