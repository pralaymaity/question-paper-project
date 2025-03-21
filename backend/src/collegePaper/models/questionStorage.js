

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
        type: DataTypes.TEXT, 
        allowNull: false, 
    },
    difficulty: {
        type: DataTypes.ENUM('easy', 'moderate', 'hard'), 
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
    
})

// Define the association between Subject and Question
SubjectPaper.hasMany(QuestionStorage, { foreignKey: 'subject_id' });
QuestionStorage.belongsTo(SubjectPaper, { foreignKey: 'subject_id' });

module.exports = QuestionStorage;