require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "dpg-d2mqbcruibrs73bnp14g-a",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // required for Render Postgres
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
