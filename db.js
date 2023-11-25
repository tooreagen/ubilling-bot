const mysql = require("mysql2");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_BASE } = process.env;

const connectionUbilling = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_BASE,
});

connectionUbilling.connect(function (err) {
  if (err) {
    console.log("Error: " + err.message);
    return;
  } else {
    console.log("Connecting to the Ubilling MySQL database: successful");
  }
});

module.exports = { connectionUbilling };
