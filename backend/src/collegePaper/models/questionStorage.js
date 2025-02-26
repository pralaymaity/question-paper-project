

const { DataTypes } = require('sequelize');
const sequelize = require("../../sequelize");

const SubjectPaper = require("../models/subjectPaper")
const QuestionStorage = sequelize.define('QuestionStorage', {
    
    id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    subject_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    question: {
        type: DataTypes.TEXT, // stores unlimited-length text including \n,
        allowNull: false, // Store who created the question
    },
    difficulty: {
        type: DataTypes.ENUM('easy', 'moderate', 'hard'), // Example of enum levels
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
    
})

// Define the association between Subject and Question
SubjectPaper.hasMany(QuestionStorage, { foreignKey: 'subject_id' });
QuestionStorage.belongsTo(SubjectPaper, { foreignKey: 'subject_id' });

module.exports = QuestionStorage;