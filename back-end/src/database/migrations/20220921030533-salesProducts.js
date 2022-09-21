'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SalesProducts', {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('SalesProducts');
  }
};
