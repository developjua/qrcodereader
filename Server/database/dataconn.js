const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
});
pool.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

module.exports = pool;
