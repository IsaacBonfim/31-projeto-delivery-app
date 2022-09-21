'use strict';

const { QueryInterface } = require("sequelize/types");

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false
      },
      urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
