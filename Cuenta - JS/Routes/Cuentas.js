const express = require('express');
const crearCuenta = require('../Controllers/CrearCuenta');
const listarCuentas = require('../Controllers/ListarCuentas');
const obtenerCuentaPorId = require('../Controllers/Cuenta-ID');
const actualizarCuenta = require('../Controllers/ActualizarCuenta');
const eliminarCuenta = require('../Controllers/EliminarCuenta');
const validarUsuario = require('../Middlewares/ValidarUsuario');

const router = express.Router();
router.post('/', validarUsuario, crearCuenta);                   
router.get('/usuario/:usuarioId', listarCuentas);
router.get('/:id', obtenerCuentaPorId);          
router.put('/:id', actualizarCuenta);            
router.delete('/:id', eliminarCuenta);           

module.exports = router;
