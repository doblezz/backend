const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const {
  connectToDatabase,
  queryDatabase,
  closeDatabaseConnection,
} = require('./services/utils/database');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar cabeceras y CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Conectar a la base de datos
connectToDatabase()
  .then((connection) => {
    // Realizar consulta a la base de datos
    return queryDatabase('SHOW TABLES');
  })
  .then((results) => {
    // Procesar resultados
    results.forEach((row) => {
      console.log(row[`Tables_in_${process.env.DB_DATABASE}`]);
    });
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    // Cerrar la conexión después de realizar la consulta
    closeDatabaseConnection();
  });

// Resto de tu configuración y rutas
const apiRouter = require('./router/router');
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
