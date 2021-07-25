'use strict';

module.exports = (sequelize, DataTypes) => {
  let UserRole = sequelize.define(
    'UserRole',
    {
      userId: { type: DataTypes.STRING(50), allowNull: false },
      roleId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'user_role',
      underscored: true,
      timestamps: false,
    }
  );

  UserRole.associate = (models) => {
    models.UserRole.hasMany(models.Users, {
      foreignKey: 'userId',
      as: 'roles',
    });
  };

  return UserRole;
};
