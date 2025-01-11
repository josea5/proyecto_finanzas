const { Sequelize } = require('sequelize');

// Cargar variables de entorno desde .env
require('dotenv').config();

// Crear instancia de Sequelize con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nombre de la base de datos
  process.env.DB_USER,       // Usuario de la base de datos
  process.env.DB_PASSWORD,   // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Host del servidor de la base de datos
    port: process.env.DB_PORT, // Puerto de la base de datos
    dialect: 'postgres',       // Dialecto para PostgreSQL
    logging: false,            // Desactivar logs (opcional)
  }
);

// Exportar la instancia de Sequelize
module.exports = sequelize;
