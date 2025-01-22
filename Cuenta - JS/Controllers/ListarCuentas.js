const Cuenta = require('../Models/CountModel');

const listarCuentas = async (req, res) => {
  const usuarioId = req.user.id;  // Obtener el usuarioId desde el token validado
  try {
    // Buscar todas las cuentas asociadas al usuario autenticado
    const cuentas = await Cuenta.findAll({ where: { usuarioId } });
    
    // Si no hay cuentas, devolver un mensaje informando
    if (cuentas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron cuentas para este usuario' });
    }

    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las cuentas', detalle: error.message });
  }
};

module.exports = listarCuentas;
