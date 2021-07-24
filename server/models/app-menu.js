'use strict';

module.exports = (sequelize, DataTypes) => {
  let AppMenu = sequelize.define(
    'AppMenu',
    {
      id: { type: DataTypes.STRING(5), primaryKey: true },
      menuName: { type: DataTypes.STRING(50), allowNull: false },
      icon: { type: DataTypes.STRING(50), allowNull: false },
    },
    {
      tableName: 'app_menu',
      timestamps: false,
      underscored: true,
    }
  );

  return AppMenu;
};
