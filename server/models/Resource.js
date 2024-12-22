const { DataTypes } = require('sequelize');
const { sequelize } = require('../server');

const Resource = sequelize.define('Resource', {
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
  },
  type: {
    type: DataTypes.ENUM('mod', 'resourcepack', 'map'),
    allowNull: false
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mcVersion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  downloadUrl: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  }
});

module.exports = Resource; 