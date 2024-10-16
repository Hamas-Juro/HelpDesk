const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING(240),
  },
});

module.exports = Category;
