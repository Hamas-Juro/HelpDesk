const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Log = sequelize.define("log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  action: {
    type: Sequelize.STRING(50),
  },
  ticketId: {
    type: Sequelize.INTEGER,
    field: "ticket_id",
  },
  userId: {
    type: Sequelize.INTEGER,
    field: "user_id",
  },
});

module.exports = Log;
