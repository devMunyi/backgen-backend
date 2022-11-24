require('dotenv').config();
// const { createPool } = require("mysql");
const { createPool } = require('mysql2/promise');

//db connection pool
const dbOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  port: '3306',
  connectionLimit: 10,
  queueLimit: 0,
};

if (process.env.NODE_ENV !== 'Development') {
  dbOptions.host = process.env.HOST;
  dbOptions.user = process.env.USER;
  dbOptions.password = process.env.PASS;
  dbOptions.database = process.env.DATABASE;
}

const pool = createPool(dbOptions);

if (pool) {
  console.log('Database Connnected Successfully!');
} else {
  console.log('Error Establishing Database Connection!');
}

module.exports = pool;
