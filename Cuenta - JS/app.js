require('dotenv').config(); 
const express = require('express');
const sequelize = require('./Config/db');
const cuentasRouter = require('./Routes/Cuentas'); 

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
app.use('/cuentas', cuentasRouter); 

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));


sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados.'))
  .catch((err) => console.error('Error al sincronizar los modelos:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
