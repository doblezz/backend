const jwt = require("jsonwebtoken");
const util = require('util');
const db = require("../services/utils/db");

const queryAsync = util.promisify(db.query).bind(db);

async function login(req, res) {
  const SECRET_KEY = process.env.SECRET_JWT;
  try {
    const { username } = req.body;

    const query = "SELECT * FROM company_users WHERE username = ?";
    const results = await queryAsync(query, [username]);

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
