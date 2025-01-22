const Cuenta = require('../Models/CountModel');

const actualizarCuenta = async (req, res) => {
  const { id } = req.params;
  const { tipoCuenta, descripcion, moneda } = req.body;
  const usuarioId = req.user.id;  // Obtener el usuarioId desde el token validado

  try {
    const cuenta = await Cuenta.findByPk(id);

    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }

    // Verificar si el usuario que está intentando actualizar es el dueño de la cuenta
    if (cuenta.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No tiene permiso para modificar esta cuenta' });
    }

    // Actualizar los campos
    cuenta.tipoCuenta = tipoCuenta || cuenta.tipoCuenta;
    cuenta.descripcion = descripcion || cuenta.descripcion;
    cuenta.moneda = moneda || cuenta.moneda;

    await cuenta.save();
    res.json(cuenta);  // Devolver la cuenta actualizada
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la cuenta', detalle: error.message });
  }
};

module.exports = actualizarCuenta;
