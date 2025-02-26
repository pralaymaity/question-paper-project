

const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize'); // Import the Sequelize instance
const Subject = require('./subject'); // Import the Subject model



// Define the Question model
const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increments the ID
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Foreign key to Subject table
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false, // Store who created the question
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'), // Example of enum levels
    allowNull: false,
  },
  questions_details: {
    type: DataTypes.JSON, // Store questions details as JSON
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false, // Store who created the question
  },

  status: {
    type: DataTypes.STRING, // You can adjust this to be ENUM if needed
    allowNull: false,
  },
});


// Define the association between Subject and Question
Subject.hasMany(Question, { foreignKey: 'subject_id' });
Question.belongsTo(Subject, { foreignKey: 'subject_id' });


// Export the Question model
module.exports = Question;
