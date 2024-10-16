const express = require("express");
const auth = require("../middleware/auth");
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../controllers/teams");

const router = express.Router();

router.post("/create", createTeam);
router.get("/", getAllTeams);
router.put("/:teamId", updateTeam);
router.delete("/:teamId", deleteTeam);
router.get("/:teamId", getTeamById);

module.exports = router;
