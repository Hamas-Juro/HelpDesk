const { Team, User } = require("../models");

exports.createTeam = async (req, res, next) => {
  const { name, description, userIds } = req.body;

  try {
    // Step 1: Create a new team
    const newTeam = await Team.create({
      name,
      description,
    });

    // Step 2: Fetch users by their IDs
    if (userIds && userIds.length > 0) {
      const users = await User.findAll({ where: { id: userIds } });

      // Step 3: Associate the users with the new team using the alias "Users"
      if (users.length > 0) {
        await newTeam.addUsers(users); // Using the alias "Users"
      }
    }

    // Step 4: Fetch the team with its users to return a response
    const teamWithUsers = await Team.findByPk(newTeam.id, {
      include: {
        model: User,
        as: "Users", // Specify the alias "Users"
        through: { attributes: [] }, // Ignore join table attributes
      },
    });

    return res.status(201).json({
      message: "Team created successfully",
      team: teamWithUsers,
    });
  } catch (error) {
    console.error("Error creating team:", error); // Log the full error for debugging
    return res
      .status(500)
      .json({ message: "Failed to create team", error: error.message });
  }
};

exports.getAllTeams = async (req, res, next) => {
  try {
    // Fetch all teams along with associated users using the alias "Users"
    const teams = await Team.findAll({
      include: {
        model: User,
        as: "Users", // Alias for the association
        through: { attributes: [] }, // Exclude join table attributes
      },
    });

    return res.status(200).json({
      message: "Teams fetched successfully",
      teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return res.status(500).json({
      message: "Failed to fetch teams",
      error: error.message,
    });
  }
};

exports.updateTeam = async (req, res, next) => {
  const { teamId } = req.params; // The teamId passed as a URL parameter
  const { name, description, userIds } = req.body; // The data to update, including user IDs

  try {
    // 1. Find the team by ID
    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // 2. Update the team name and description
    team.name = name || team.name;
    team.description = description || team.description;

    // Save the updated team details
    await team.save();

    // 3. Update associated users if userIds are provided
    if (userIds && userIds.length > 0) {
      const users = await User.findAll({ where: { id: userIds } });
      await team.setUsers(users); // Update the team-user association
    }

    // 4. Return the updated team with associated users
    const updatedTeam = await Team.findByPk(teamId, {
      include: { model: User, as: "Users" },
    });

    return res.status(200).json({
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Error updating team:", error);
    return res.status(500).json({
      message: "Failed to update team",
      error: error.message,
    });
  }
};

exports.deleteTeam = async (req, res, next) => {
  const { teamId } = req.params; // The teamId passed as a URL parameter

  try {
    // 1. Find the team by ID
    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // 2. Remove the association with users before deleting the team
    await team.setUsers([]); // Clear associated users

    // 3. Delete the team
    await team.destroy();

    return res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    return res.status(500).json({
      message: "Failed to delete team",
      error: error.message,
    });
  }
};

exports.getTeamById = async (req, res) => {
  const { teamId } = req.params;

  try {
    // Fetch the team by its ID, including associated users
    const team = await Team.findByPk(teamId, {
      include: {
        model: User,
        as: "Users", // Alias used for the association
        attributes: ["id", "name", "email", "role"], // Select only specific user attributes
      },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Return the team with its associated users
    return res.status(200).json({
      message: "Team found successfully",
      team,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    return res.status(500).json({ message: "Failed to fetch team" });
  }
};
