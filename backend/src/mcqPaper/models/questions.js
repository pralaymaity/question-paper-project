

const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance
const Subject = require('./subject'); // Import the Subject model



// Define the Question model
const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'), 
    allowNull: false,
  },
  questions_details: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false, 
  },

  status: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});


// Define the association between Subject and Question
Subject.hasMany(Question, { foreignKey: 'subject_id' });
Question.belongsTo(Subject, { foreignKey: 'subject_id' });


// Export the Question model
module.exports = Question;
