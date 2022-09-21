'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
   up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      sellerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'seller_id',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price'
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'delivery_address'
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'created_at'
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'sale_date'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};
