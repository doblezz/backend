// Importa la biblioteca dotenv y configura las variables de entorno
require('dotenv').config();

// Importa la biblioteca mysql
const mysql = require('mysql');

// Configura la conexión a la base de datos utilizando las variables de entorno
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Crea y exporta la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos: ' + process.env.DB_DATABASE);
  }
});

module.exports = connection;
