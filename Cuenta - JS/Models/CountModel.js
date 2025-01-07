const { DataTypes, Model } = require('sequelize');
const sequelize = require('../Config/db');

class Cuenta extends Model {}

Cuenta.init(
  {
    id: {
      type: DataTypes.INTEGER,      
      primaryKey: true,             
      autoIncrement: true,          
    },
    tipoCuenta: {
      type: DataTypes.STRING,       
      allowNull: false,             
    },
    descripcion: {
      type: DataTypes.STRING,       
      allowNull: true,              
    },
    moneda: {
      type: DataTypes.STRING,       
      allowNull: false,             
    },
    usuarioId: {
      type: DataTypes.INTEGER,      
      allowNull: false,             
    },
  },
  {
    sequelize,                      
    modelName: 'Cuenta',            
    tableName: 'cuentas',           
    timestamps: true,               
  }
);

module.exports = Cuenta;
