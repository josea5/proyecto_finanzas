const Cuenta = require('../Models/CountModel');

const eliminarCuenta = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.user.id;  // Obtener el usuarioId desde el token validado

  try {
    const cuenta = await Cuenta.findByPk(id);
    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }

    // Verificar si el usuario tiene acceso a eliminar esta cuenta
    if (cuenta.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No tiene permiso para eliminar esta cuenta' });
    }

    // Eliminar la cuenta
    await cuenta.destroy();
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cuenta', detalle: error.message });
  }
};

module.exports = eliminarCuenta;
