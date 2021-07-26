'use strict';

module.exports = (sequelize, DataTypes) => {
  let UsersInfo = sequelize.define(
    'UsersInfo',
    {
      nik: { type: DataTypes.STRING(16), primaryKey: true },
      userId: { type: DataTypes.STRING(50), unique: true },
      firstName: { type: DataTypes.STRING(50), allowNull: false },
      lastName: { type: DataTypes.STRING(50) },
      birthPlace: { type: DataTypes.STRING(50), allowNull: false },
      birthDate: { type: DataTypes.DATE, allowNull: false },
      city: { type: DataTypes.STRING(50), allowNull: false },
      address: { type: DataTypes.STRING(200), allowNull: false },
      zipCode: { type: DataTypes.STRING(5), allowNull: false },
      accountType: { type: DataTypes.STRING(1), allowNull: false },
    },
    {
      tableName: 'users_information',
      timestamps: false,
      underscored: true,
    }
  );

  return UsersInfo;
};
