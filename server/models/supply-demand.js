'use strict';
module.exports = (sequelize, DataTypes) => {
  let SupplyDemand = sequelize.define(
    'SupplyDemand',
    {
      id: { type: DataTypes.STRING(36), primaryKey: true },
      userId: { type: DataTypes.STRING(50), allowNull: false },
      commodityId: { type: DataTypes.STRING(36), allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING(10), allowNull: false },
      createdDate: { type: DataTypes.DATE, allowNull: false },
    },
    {
      tableName: 'users_commodities',
      timestamps: false,
      underscored: true,
    }
  );

  SupplyDemand.associate = models => {
    models.SupplyDemand.belongsTo(models.UsersInfo, {
      foreignKey: 'userId',
      targetKey: 'userId',
      as: 'userDetails',
    });
    models.SupplyDemand.belongsTo(models.Accounts, {
      foreignKey: 'userId',
      as: 'accountDetails',
    });
    models.SupplyDemand.belongsTo(models.Commodities, {
      foreignKey: 'commodityId',
      as: 'commodityDetails',
    });
  };

  return SupplyDemand;
};
