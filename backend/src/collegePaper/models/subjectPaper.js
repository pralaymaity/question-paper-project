
const { DataTypes } = require('sequelize');
const sequelize = require("../../config/config")


// Define the Subject model
const SubjectPaper = sequelize.define('SubjectPaper', {
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
  
module.exports = SubjectPaper;
  