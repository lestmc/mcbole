const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Example = sequelize.define('Example', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

module.exports = Example; 