const Cuenta = require('../Models/CountModel');

const listarCuentas = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const cuentas = await Cuenta.findAll({ where: { usuarioId } });
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las cuentas', detalle: error.message });
  }
};

module.exports = listarCuentas;
