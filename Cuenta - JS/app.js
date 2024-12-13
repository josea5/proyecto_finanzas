const express = require('express');
const app = express();
const CrearCuenta = require('./Controllers/CrearCuenta');
const ActualizarCuenta = require('./Controllers/ActualizarCuenta');
const CuentaID = require('./Controllers/Cuenta-ID');
const EliminarCuenta = require('./Controllers/EliminarCuenta');
const ListarCuenta = require('./Controllers/ListarCuentas');

app.use(express.json());