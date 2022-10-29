require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { readdirSync } = require('fs');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 5000;
const hostname = 'localhost';

//configuring key middlewares
app.use(compression()); //compresses static files
app.use(morgan('dev')); //keep tracks of incoming requests
app.use(express.json()); //enable express to receive form data in json format
app.use(express.urlencoded({ extended: false })); //enable express to receive form data
app.use(fileUpload()); //handles file uploads
app.use('/back', express.static('public')); //defines where static file requests should be retrieved
app.use(
  cors({
    origin: [
      'https://zidiapp.com',
      'https://www.zidiapp.com',
      'https://backgen.net',
      'https://www.backgen.net',
      'http://localhost',
    ],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    credentials: true,
  })
); //handles cross-domain requests

//express-session configurations
const storeOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  clearExpired: true,
}; //db store

if (process.env.NODE_ENV !== 'Development') {
  storeOptions.host = process.env.HOST;
  storeOptions.user = process.env.USER;
  storeOptions.password = process.env.PASS;
  storeOptions.database = process.env.DATABASE;
}

//Autoload routes
readdirSync('./src/routes').map((r) =>
  app.use('/back', require(`./src/routes/${r}`))
);

//listen for incoming requests
app.listen(port, hostname, () => {
  console.log(`Server is up and running on port ${port}`);
});
