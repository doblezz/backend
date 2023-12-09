// database.js
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
};

// Crea y exporta la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(`Error al conectar a la base de datos: ${err.message}`);
        return;
      }
      console.log('Conexión exitosa a la base de datos');
      resolve(connection);
    });
  });
};

// Realizar consulta a la base de datos
const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(`Error al realizar la consulta: ${err.message}`);
        return;
      }
      resolve(results);
    });
  });
};

// Cerrar la conexión a la base de datos
const closeDatabaseConnection = () => {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(`Error al cerrar la conexión: ${err.message}`);
        return;
      }
      console.log('Conexión cerrada');
      resolve();
    });
  });
};

module.exports = {
  connectToDatabase,
  queryDatabase,
  closeDatabaseConnection,
};
