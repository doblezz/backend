const jwt = require("jsonwebtoken");
const database = require("../services/utils/database");

async function login(req, res) {
  const SECRET_KEY = process.env.SECRET_JWT;
  try {
    const { username } = req.body;

    // Conecta a la base de datos utilizando la función connectToDatabase
    const connection = await database.connectToDatabase();

    const query = "SELECT * FROM company_users WHERE username = ?";

    // Utiliza la función queryDatabase para realizar la consulta
    const results = await database.queryDatabase(connection, query, [username]);

    // Cierra la conexión después de realizar la consulta
    await database.closeDatabaseConnection(connection);

    // Maneja el resultado de la consulta
    if (results.length === 0) {
      const labeledData = {
        notification: {
          type: "error",
          message: `El usuario ${username} no existe`,
        },
      };
      res.status(401).json([labeledData]);
    } else {
      // Usuario válido, generar token
      const token = jwt.sign(
        { userId: results[0].id, username: results[0].username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token });
    }
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = login;
