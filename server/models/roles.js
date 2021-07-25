'use strict';

module.exports = (sequelize, DataTypes) => {
  let Roles = sequelize.define(
    'Roles',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING(50), allowNull: false },
      description: { type: DataTypes.STRING(100), allowNull: true },
    },
    {
      tableName: 'roles',
      timestamps: false,
    }
  );

  return Roles;
};
