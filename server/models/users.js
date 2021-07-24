'use strict';

module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define(
    'Users',
    {
      userId: { type: DataTypes.STRING(50), primaryKey: true },
      pass: { type: DataTypes.STRING(100), allowNull: false },
      displayName: { type: DataTypes.STRING(100), allowNull: false },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );

  return Users;
};
