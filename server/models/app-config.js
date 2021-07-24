'use strict';

module.exports = (sequelize, DataTypes) => {
  let AppConfig = sequelize.define(
    'AppConfig',
    {
      key: { type: DataTypes.STRING(100), primaryKey: true },
      value: { type: DataTypes.STRING(100), allowNull: false },
    },
    {
      tableName: 'app_config',
      timestamps: false,
    }
  );

  return AppConfig;
};
