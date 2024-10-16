const express = require("express");
const {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/tickets");
const Auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", Auth, createTicket);
router.get("/", Auth, getAllTickets);
router.get("/:id", Auth, getSingleTicket);
router.put("/:id", Auth, updateTicket);
router.delete("/:id", Auth, deleteTicket);

module.exports = router;
