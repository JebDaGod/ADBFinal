const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Project;