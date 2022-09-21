const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  sellerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'seller_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  totalPrice: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
    field: 'total_price'
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'delivery_address'
  },
  deliveryNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at'
  },
  saleDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'sale_date'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Sales = sequelize.define('Sales', attributes, { tableName: 'sales' });
  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, { key: 'userId', as: 'user' });
    Sales.belongsTo(models.Users, { key: 'sellerId', as: 'seller' });
    Sales.hasMany(models.SalesProducts, { key: 'saleIs', as: 'sale' });
  };
  return Sales;
};
