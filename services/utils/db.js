// Importa la biblioteca dotenv y configura las variables de entorno
require('dotenv').config();

// Importa la biblioteca mysql
const mysql = require('mysql');

// Configura la conexión a la base de datos utilizando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos : '+ process.env.DB_DATABASE);
  }
});

// Exporta la conexión para que pueda ser utilizada en otros archivos
module.exports = connection;