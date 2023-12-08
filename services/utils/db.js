require('dotenv').config();
const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Esta función devuelve una nueva conexión a la base de datos
function createConnection() {
  return mysql.createConnection(dbConfig);
}

module.exports = { createConnection };