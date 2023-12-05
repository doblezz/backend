const axios = require('axios');
const RatesOffline = require('../../data/ratesOffline.json');

/**
 * Obtiene las tasas desde una API externa.
 * @param {Object} res - Objeto de respuesta de Express.
 */
async function getRates(res) {
  // URL de la API de tasas proporcionada por la configuración del entorno
  const ratesApiUrl = process.env.API_RATES;

  try {
    // Realiza la consulta a la API de tasas
    const response = await axios.get(ratesApiUrl);

    // Extrae las tasas de la respuesta de la API
    const tasas = response.data;

    // Devuelve las tasas con un código de estado 200
    res.status(200).json(tasas);
  } catch (error) {
    // En caso de error, registra el error en la consola
    // console.error('Error al obtener tasas desde la API:', error.message);
    console.log('Rates: Offline ===> ' + JSON.stringify());
    
    // Responde al cliente con un código de estado 500 y el mensaje de error
    res.status(200).json(RatesOffline);
  }
}

module.exports = getRates;
