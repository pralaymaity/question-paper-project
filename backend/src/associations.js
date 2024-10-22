
// models/index.js or wherever you initialize models
const ExamForm = require('./examForm');
const ExamQuestions = require('./examQuestions');
const Question = require('./questions');

// ExamForm has many questions through ExamQuestions
ExamForm.belongsToMany(Question, { through: ExamQuestions, foreignKey: 'exam_id' });
Question.belongsToMany(ExamForm, { through: ExamQuestions, foreignKey: 'question_id' });

module.exports = { ExamForm, ExamQuestions, Question };
