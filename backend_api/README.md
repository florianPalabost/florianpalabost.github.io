# Backend NODE JS API 

## Requirements 
- Docker-compose v12
- node


## Installation 
-
  ````bash 
  docker-compose up --build -d 
  ````
- Create the database manually
    ````bash
      - docker exec -it postgres_container sh
      - su postgres 
      - psql
      - CREATE DATABASE animes_api;
    ````
- Run script to create the differents tables 
  ````bash
  node create_db.js
  ````
### With ORM Sequelize
-
  ````bash
  export DATABASE_URL=postgres://postgres:admin@localhost:5432/animes_api
  ````
- lancer migration database ```` db:migrate ````

