It's online shop on bootcamp
Technology stack :

Frontend:
 1) React + TS
 2) Backend: NodeJS (NestJS) + TS

For server side: 
To run a project in development mode, a file must be created: ".development.env" (npm run start:dev), for production mode: ".production.env" (npm run start).

**Running migrations inside a docker container:**

- `docker exec -it <server_image_id> npm run typeorm migration:run`