const { Pool } = require('pg');

// Configuración para postgres clasico - Se mejora usando variables de entorno.
const pool = new Pool({
    user: 'tu_usuario',       
    host: 'localhost',        
    database: 'nombre_bd',    
    password: 'tu_contraseña',
    port: 5432,               
});

// Esto es para corroborar si hemos entrado o no la base de datos
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error conectando a PostgreSQL:', err.stack);
    }
    console.log('Conexión a PostgreSQL establecida.');
    release();
});

// Lo exportamos para poder usar en otros archivos.
module.exports = pool;
