const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Log = require("./logs");

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(400),
    },
    imageUrl: {
      type: Sequelize.STRING(200),
      field: "image_url",
    },
    status: {
      type: Sequelize.STRING(50),
    },
    priority: {
      type: Sequelize.STRING(50),
    },
    createdBy: {
      type: Sequelize.INTEGER,
      field: "created_by",
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: "updated_at",
    },
  },
  {
    timestamps: true,
    hooks: {
      // Hook for logging after ticket creation
      afterCreate: async (ticket, options) => {
        await Log.create({
          action: `Ticket ${ticket.id} created`,
          ticketId: ticket.id,
          userId: ticket.createdBy, // Assuming userId is createdBy
        });
      },

      // Hook for logging after ticket update
      afterUpdate: async (ticket, options) => {
        await Log.create({
          action: `Ticket ${ticket.id} updated`,
          ticketId: ticket.id,
          userId: ticket.createdBy, // Assuming userId is createdBy
        });
      },

      // Hook for logging after ticket deletion
      afterDestroy: async (ticket, options) => {
        await Log.create({
          action: `Ticket ${ticket.id} deleted`,
          ticketId: ticket.id,
          userId: ticket.createdBy, // Assuming userId is createdBy
        });
      },
    },
  }
);

module.exports = Ticket;
