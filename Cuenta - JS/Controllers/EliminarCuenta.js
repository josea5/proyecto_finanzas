const Cuenta = require('../Models/CountModel');

const eliminarCuenta = async (req, res) => {
  const { id } = req.params;
  try {
    const cuenta = await Cuenta.findByPk(id);
    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    await cuenta.destroy();
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cuenta', detalle: error.message });
  }
};

module.exports = eliminarCuenta;
