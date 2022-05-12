require("dotenv").config();
const { createPool } = require("mysql");

//local mysql db connection
const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

if (pool) {
  console.log("Database Connnected Successfully!");
} else {
  console.log("Error Establishing Database Connection!");
}

module.exports = pool;
