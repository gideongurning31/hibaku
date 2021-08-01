'use strict';

module.exports = (sequelize, DataTypes) => {
  let Commodities = sequelize.define(
    'Commodities',
    {
      id: { type: DataTypes.STRING(32), primaryKey: true },
      name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
      type: { type: DataTypes.STRING(50), allowNull: false },
      unit: { type: DataTypes.STRING(10), allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      tableName: 'commodities',
      timestamps: false,
    }
  );

  Commodities.associate = models => {
    models.Commodities.belongsToMany(models.Accounts, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      through: models.SupplyDemand,
      foreignKey: 'commodityId',
      as: 'accountDetails',
    });
  };

  return Commodities;
};
