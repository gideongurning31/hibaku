'use strict';
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  let Commodities = sequelize.define(
    'Commodities',
    {
      id: { type: DataTypes.STRING(32), primaryKey: true, defaultValue: uuid.v4() },
      name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
      type: { type: DataTypes.STRING(50), allowNull: false },
      unit: { type: DataTypes.STRING(10), allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      tableName: 'commodities',
      timestamps: false,
    }
  );

  return Commodities;
};
