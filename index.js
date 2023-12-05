const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Selecciona el archivo .env correspondiente según el entorno
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: envFile });

const connection = require('./services/utils/db');

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Esto permite el envío de cookies
}));

// Realiza la consulta a la base de datos
connection.query('SHOW TABLES', (err, results) => {
  if (err) {
    console.error('Error al obtener la lista de tablas:', err.message);
  } else {
    results.forEach((row) => {
      console.log(row[`Tables_in_${process.env.DB_DATABASE}`]);
    });
  }
});

const apiRouter = require('./router/router');
app.use('/api', apiRouter);

// Puedes agregar más rutas y lógica según tus necesidades.
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
