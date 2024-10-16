const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const UserTeam = sequelize.define("user_team", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    field: "user_id",
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: "team_id",
  },
});

module.exports = UserTeam;
