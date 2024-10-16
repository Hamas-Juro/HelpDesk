const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const TicketCategory = sequelize.define("ticket_category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ticketId: {
    type: Sequelize.INTEGER,
    field: "ticket_id",
  },
  categoryId: {
    type: Sequelize.INTEGER,
    field: "category_id",
  },
});

module.exports = TicketCategory;
