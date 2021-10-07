FROM node:14.17.1-alpine as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . /app/

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

