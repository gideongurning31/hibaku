'use strict';

module.exports = (sequelize, DataTypes) => {
  let Accounts = sequelize.define(
    'Accounts',
    {
      userId: { type: DataTypes.STRING(50), primaryKey: true },
      pass: { type: DataTypes.STRING(100), allowNull: false },
      displayName: { type: DataTypes.STRING(100), allowNull: false },
      verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      roleId: { type: DataTypes.INTEGER },
    },
    {
      tableName: 'accounts',
      timestamps: false,
      underscored: true,
    }
  );

  Accounts.associate = (models) => {
    models.Accounts.belongsTo(models.Roles, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      foreignKey: 'roleId',
      as: 'role',
    });
  };

  return Accounts;
};
