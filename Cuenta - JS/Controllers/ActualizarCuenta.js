const Cuenta = require('../Models/CountModel');

const actualizarCuenta = async (req, res) => {
  const { id } = req.params;
  const { tipoCuenta, descripcion, moneda } = req.body;
  try {
    const cuenta = await Cuenta.findByPk(id);
    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    cuenta.tipoCuenta = tipoCuenta || cuenta.tipoCuenta;
    cuenta.descripcion = descripcion || cuenta.descripcion;
    cuenta.moneda = moneda || cuenta.moneda;

    await cuenta.save();
    res.json(cuenta);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la cuenta', detalle: error.message });
  }
};

module.exports = actualizarCuenta;
