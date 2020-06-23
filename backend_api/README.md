# Backend GraphQL server using nodeJS Express 

## Requirements 
- Docker-compose v12
- node
- graphQL


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
      - CREATE DATABASE projects_portfolio;
      - CREATE TABLE projects (id VARCHAR(255) PRIMARY KEY, title VARCHAR(255),description VARCHAR(255), technos VARCHAR(255), img VARCHAR(255), url VARCHAR(255), anneeReal VARCHAR(255));
    ````
- Run script to create the differents tables 
  ````bash
  node create_db.js
  ````
### With ORM Sequelize
-
  ````bash
  export DATABASE_URL=postgres://postgres:admin@localhost:5432/projects_portfolio
  ````
- lancer migration database ```` db:migrate ````

