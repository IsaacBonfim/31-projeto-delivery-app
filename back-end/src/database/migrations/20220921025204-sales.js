'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
   up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
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
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};
