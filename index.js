const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Selecciona el archivo .env correspondiente según el entorno
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: envFile });

const db = require('./services/utils/db'); // Ajusta la ruta según la estructura de tu proyecto

app.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Crea la conexión a la base de datos
const connection = db.createConnection(dbConfig);

// Realiza la consulta a la base de datos
connection.query('SHOW TABLES', (err, results) => {
  if (err) {
    console.error('Error al obtener la lista de tablas:', err.message);
  } else {
    console.log('Lista de tablas en la base de datos:');
    results.forEach((row) => {
      console.log(row[`Tables_in_${process.env.DB_DATABASE}`]);
    });
  }
  
  // Cierra la conexión después de realizar la consulta
  connection.end();
});

app.get('/', (req, res) => {
  console.log("Éxito al iniciar el proyecto...");
  res.send('¡Hola, mundo!');
});

// Puedes agregar más rutas y lógica según tus necesidades.
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
