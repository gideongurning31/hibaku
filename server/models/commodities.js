'use strict';

module.exports = (sequelize, DataTypes) => {
  let Commodities = sequelize.define(
    'Commodities',
    {
      id: { type: DataTypes.STRING(32), primaryKey: true },
      name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
      type: { type: DataTypes.STRING(50), allowNull: false },
      unit: { type: DataTypes.STRING(10), allowNull: false },
    },
    {
      tableName: 'commodities',
      timestamps: false,
    }
  );

  return Commodities;
};