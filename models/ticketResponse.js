const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const TicketResponse = sequelize.define("ticket_response", {
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
  responseText: {
    type: Sequelize.STRING(400),
    field: "response_text",
  },
  responseBy: {
    type: Sequelize.INTEGER,
    field: "response_by",
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at",
  },
});

module.exports = TicketResponse;
