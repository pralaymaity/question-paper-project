const { Sequelize } = require('sequelize');

// Create a new Sequelize instance, and export it for reuse
const sequelize = new Sequelize('question-paper', 'pralay', 1234, {
  host: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;

