const { Sequelize } = require("sequelize");

// Configure database connection
const sequelize = new Sequelize("helpdesk", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
