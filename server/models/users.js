'use strict';

module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define(
    'Users',
    {
      userId: { type: DataTypes.STRING(50), primaryKey: true },
      pass: { type: DataTypes.STRING(100), allowNull: false },
      displayName: { type: DataTypes.STRING(100), allowNull: false },
      verified: { type: DataTypes.BOOLEAN, notNull: true, defaultValue: false },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );

  Users.associate = (models) => {
    models.Users.belongsToMany(models.Roles, {
      through: models.UserRole,
      foreignKey: 'userId',
      as: 'roles',
    });
  };

  return Users;
};
