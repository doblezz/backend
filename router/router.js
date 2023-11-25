const express = require("express");
const router = express.Router();
const { GetRates, PostLogin } = require("../method/useMethods");


// GETS
router.get("/rates", async (req, res) => {
  try {
    await GetRates(res);
  } catch (error) {
    console.error("Error al manejar la ruta /rates:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POSTS
router.post("/login", async (req, res) => {
  try {
    await PostLogin(req, res);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
