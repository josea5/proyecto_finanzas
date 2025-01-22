const axios = require('axios');

const validarUsuario = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Obtener token del header Authorization

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  try {
    // Validar el token con el microservicio de usuarios
    const respuesta = await axios.get('http://localhost:3001/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`,  // Pasar el token al microservicio de usuarios
      },
    });

    if (respuesta.status === 200) {
      req.user = respuesta.data;  // Almacenar la información del usuario en el request
      next();  // Usuario validado, continuar con la siguiente acción
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al validar usuario:', error.message);
    return res.status(500).json({ error: 'Error al validar el usuario', detalle: error.message });
  }
};

module.exports = validarUsuario;
