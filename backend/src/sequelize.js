const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('question-paper', 'pralay', 1234, {
  host: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;

