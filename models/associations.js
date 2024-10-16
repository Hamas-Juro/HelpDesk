const User = require("./userModel");
const Ticket = require("./tickets");
const TicketResponse = require("./ticketResponse");
const Category = require("./category");
const TicketCategory = require("./ticketsCategory");
const Log = require("./logs");
const Team = require("./teams");
const UserTeam = require("./usersTeam");

// Associations
User.hasMany(Ticket, { foreignKey: "created_by" });
Ticket.belongsTo(User, { foreignKey: "created_by" });

Ticket.hasMany(TicketResponse, { foreignKey: "ticket_id" });
TicketResponse.belongsTo(Ticket, { foreignKey: "ticket_id" });

User.hasMany(TicketResponse, { foreignKey: "response_by" });
TicketResponse.belongsTo(User, { foreignKey: "response_by" });

Ticket.belongsToMany(Category, {
  through: TicketCategory,
  foreignKey: "ticket_id",
});
Category.belongsToMany(Ticket, {
  through: TicketCategory,
  foreignKey: "category_id",
});

Ticket.hasMany(Log, { foreignKey: "ticket_id" });
Log.belongsTo(Ticket, { foreignKey: "ticket_id" });

// User-Teams associations
User.belongsToMany(Team, {
  through: UserTeam,
  foreignKey: "user_id",
  as: "Teams",
});
Team.belongsToMany(User, {
  through: UserTeam,
  foreignKey: "team_id",
  as: "Users",
});
