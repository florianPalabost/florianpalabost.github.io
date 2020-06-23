// FOR NOW, NEED TO CREATE MANUALLY THE DATABASE animes_api 

const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const Pool = pg.Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'animes_api',
  password: process.env.POSTGRES_PWD,
  port: process.env.POSTGRES_PORT || '5432',
});
console.log('user : ', process.env.POSTGRES_USER);
console.log('host : ', process.env.POSTGRES_HOST);
console.log('database : ', process.env.POSTGRES_DB);
console.log('password : ', process.env.POSTGRES_PWD);
console.log('port : ', process.env.POSTGRES_PORT);

;(async () => {
  const client = await pool.connect();
  console.log('connected to the db for creating database !');
  await pool.query('DROP TABLE IF EXISTS animes', (err, res) => {
    if(err) {
      console.log(err);
    }
    console.log('DROP TABLE animes !');
  });
  // todo search a way to create db and change db to animes_api programmatically
  // await pool.query('CREATE DATABASE animes_api', (err, res) => {
  //   if(err) {
  //     console.log(err);
  //   }
  //   console.log('DATABASE api_animes created !');
  // });

  const queryTable = `CREATE TABLE animes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    synopsis TEXT,
    rating integer,
    startDate VARCHAR(250),
    endDate VARCHAR(250),
    status VARCHAR(250),
    posterImage VARCHAR(250),
    coverImage VARCHAR(250),
    nbEpisode integer,
    episodeLength integer,
    ytVideoID VARCHAR(250)
  )`; 
  setTimeout(function(){
    console.log("THIS IS");
}, 8000);
  await pool.query(queryTable, (err, res) => {
    if(err) {
      console.log(err);
    }
    console.log('TABLE animes created !');
  }); 
  await pool.end();
})().catch(e => console.log(e.stack));
