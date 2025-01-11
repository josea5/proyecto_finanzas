const axios = require('axios');

const validarUsuario = async (req, res, next) => {
  const { usuarioId } = req.body;  // Aquí es donde recibes el usuarioId

  try {
    const respuesta = await axios.get(`http://linkdelmicroservicio/users/${usuarioId}`);

    if (respuesta.status === 200) {
      next();  // Usuario encontrado, pasa al siguiente middleware
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al validar usuario:', error.message);
    return res.status(500).json({ error: 'Error al validar el usuario', detalle: error.message });
  }
};

module.exports = validarUsuario;
