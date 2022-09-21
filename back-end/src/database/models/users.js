const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const users = sequelize.define('Users', attributes, { tableName: 'users' });
  users.associate = (models) => {
    users.hasMany(models.Sales, { key: 'userId', as: 'user' });
    users.hasMany(models.Sales, { key: 'sellerId', as: 'seller' });
  };
  return users;
};
