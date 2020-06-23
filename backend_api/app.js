const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');
const dotenv = require('dotenv');
const expressGraphQl = require('express-graphql');

const { query } = require('./schemas/queries');
const { mutation } = require('./schemas/mutations');
const { schema } = require('./uploads/schema');

const { GraphQLSchema } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const { graphqlUploadExpress } = require('graphql-upload');
const { uploadImage } = require('./uploads/resolver');
dotenv.config();

const Pool = pg.Pool;
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'projects_portfolio',
  password: process.env.POSTGRES_PWD,
  port: process.env.POSTGRES_PORT || '5432'
});

let reporter = function(type, ...rest) {
  // remote reporters logic goes here
};

const API_VERSION = 'v1';

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function(err) {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);

  reporter('uncaughtException', new Date().toUTCString(), err.message, err.stack);

  process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function(reason, promise) {
  console.error('unhandled rejection:', reason.message || reason);

  reporter('uncaughtException', new Date().toUTCString(), reason.message || reason);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/uploads/projects/:file', (req, res, next) => {
  const filename = req.params.file;
  const pathDir = path.join(__dirname, `./uploads/projects/${filename}`);
  res.sendFile(pathDir);
});

const root = {
  Upload: GraphQLUpload,
  uploadImage
};
app.use(
  '/api/' + API_VERSION + '/upload',
  graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 1 }),
  expressGraphQl({ schema, rootValue: root })
);

const schema2 = new GraphQLSchema({
  query,
  mutation
});

app.use(
  '/api/' + API_VERSION + '/',
  expressGraphQl({
    schema: schema2,
    graphiql: true
  })
);

module.exports = app;
