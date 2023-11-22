const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const db = require('./db'); 

app.use(bodyParser.json());

db.query('SHOW TABLES', (err, results) => {
  if (err) {
    console.error('Error al obtener la lista de tablas:', err.message);
  } else {
    console.log('Lista de tablas en la base de datos:');
    results.forEach((row) => {
      console.log(row[`Tables_in_${process.env.DB_DATABASE}`]);
    });
  }
  // Cierra la conexión después de realizar la consulta
  db.end();
});

app.get('/', (req, res) => {
  console.log("Exito init projec...")
  res.send('¡Hola, mundo!');
});

// Puedes agregar más rutas y lógica según tus necesidades.
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});