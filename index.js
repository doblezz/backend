const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

const {
  connectToDatabase,
  queryDatabase,
  closeDatabaseConnection,
} = require('./services/utils/database');

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://quedaza.netlify.app', 'https://quezada.do/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.options('/api', cors(corsOptions));

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
    })
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