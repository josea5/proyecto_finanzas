const Cuenta = require('../Models/CountModel');

const obtenerCuentaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cuenta = await Cuenta.findByPk(id);
    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    res.json(cuenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cuenta', detalle: error.message });
  }
};

module.exports = obtenerCuentaPorId;
