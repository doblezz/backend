const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Puedes agregar más rutas y lógica según tus necesidades.
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});