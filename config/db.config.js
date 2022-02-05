require('dotenv').config();
const {createPool} = require("mysql");

//local mysql db connection
const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB_NAME
});

if(pool){
    console.log("Database Connnected Successfully!");
}else{
    console.log("Error Establishing Database Connection!");
}

module.exports = pool;

