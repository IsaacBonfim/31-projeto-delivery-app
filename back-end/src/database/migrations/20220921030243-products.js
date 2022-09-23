'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DECIMAL(4, ),
        allowNull: false
      },
      urlImage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};
