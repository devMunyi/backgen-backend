require("dotenv").config();
const { createPool } = require("mysql");

//local mysql db connection
const pool = createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
});

if (pool) {
  console.log("Database Connnected Successfully!");
} else {
  console.log("Error Establishing Database Connection!");
}

module.exports = pool;
