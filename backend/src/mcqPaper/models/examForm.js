
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const ExamForm = sequelize.define('ExamForm', {
  exam_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
    primaryKey: true,
  },
  exam_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  academic_session: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullmarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ExamForm;
