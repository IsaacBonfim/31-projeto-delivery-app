const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
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
  const User = sequelize.define('Users', attributes, { tableName: 'users', timestamps: false });
  User.associate = (models) => {
    User.hasMany(models.Sales, { key: 'userId', as: 'user' });
    User.hasMany(models.Sales, { key: 'sellerId', as: 'seller' });
  };
  return User;
};
