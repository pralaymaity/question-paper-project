

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

// Define the Subject model
const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subject_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Subject;

