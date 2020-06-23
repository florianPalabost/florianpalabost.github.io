const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const Pool = pg.Pool;
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'projects_portfolio',
  password: process.env.POSTGRES_PWD,
  port: process.env.POSTGRES_PORT || '5432'
});
console.log('user : ', process.env.POSTGRES_USER);
console.log('host : ', process.env.POSTGRES_HOST);
console.log('database : ', process.env.POSTGRES_DB);
console.log('password : ', process.env.POSTGRES_PWD);
console.log('port : ', process.env.POSTGRES_PORT);

(async () => {
  const client = await pool.connect();
  console.log('connected to the db for creating database !');
  await pool.query('DROP TABLE IF EXISTS projects', (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('DROP TABLE projects !');
  });

  const queryTable = `CREATE TABLE projects(
    id VARCHAR(250) PRIMARY KEY NOT NULL,
    title VARCHAR(250) NOT NULL,
    description TEXT,
    technos VARCHAR(250) ,
    img VARCHAR(250),
    url VARCHAR(250),
    anneeReal VARCHAR(250)
  )`;
  setTimeout(function() {
    console.log('in progress');
  }, 8000);
  await pool.query(queryTable, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('TABLE projects created !');
  });
  await pool.end();
})().catch(e => console.log(e.stack));
