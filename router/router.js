const express = require('express');
const router = express.Router();
const {GetRates} = require('../method/useMethods');

router.get('/rates', async (req, res) => {
    try {
      await GetRates(res);
    } catch (error) {
      console.error('Error al manejar la ruta /rates:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

module.exports = router;