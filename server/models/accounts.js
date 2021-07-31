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

  Accounts.associate = models => {
    models.Accounts.hasOne(models.UsersInfo, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      foreignKey: 'userId',
      as: 'info',
    });
    models.Accounts.belongsTo(models.Roles, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      foreignKey: 'roleId',
      as: 'role',
    });
    models.Accounts.belongsToMany(models.Commodities, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      through: models.UsersCommodities,
      foreignKey: 'userId',
      as: 'commodities',
    });
  };

  return Accounts;
};
