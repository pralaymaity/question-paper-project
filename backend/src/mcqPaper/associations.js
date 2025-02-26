
// models/index.js or wherever you initialize models
const ExamForm = require('./models/examForm');
const ExamQuestions = require('./models/examQuestions');
const Question = require('./models/questions');

// Define associations
ExamForm.belongsToMany(Question, {
    through: ExamQuestions,
    foreignKey: 'exam_id',
    otherKey: 'question_id' // Important to specify this
});
  
Question.belongsToMany(ExamForm, {
    through: ExamQuestions,
    foreignKey: 'question_id',
    otherKey: 'exam_id' // Important to specify this
});
  
// Associations for ExamQuestions
ExamQuestions.belongsTo(ExamForm, { foreignKey: 'exam_id' });
ExamQuestions.belongsTo(Question, { foreignKey: 'question_id' });
ExamForm.hasMany(ExamQuestions, { foreignKey: 'exam_id' });
Question.hasMany(ExamQuestions, { foreignKey: 'question_id' });

module.exports = { ExamForm, ExamQuestions, Question };



