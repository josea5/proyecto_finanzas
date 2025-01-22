const Cuenta = require('../Models/CountModel');

const crearCuenta = async (req, res) => {
  try {
    const { tipoCuenta, descripcion, moneda } = req.body; // Captura datos del cuerpo de la solicitud
    const usuarioId = req.user.id;  // Obtener el usuarioId desde el token validado

    // Crear la cuenta con el usuarioId
    const nuevaCuenta = await Cuenta.create({ tipoCuenta, descripcion, moneda, usuarioId });

    res.status(201).json(nuevaCuenta); // Responde con la cuenta creada
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la cuenta', detalle: error.message });
  }
};

module.exports = crearCuenta;
