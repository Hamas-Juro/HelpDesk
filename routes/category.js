const express = require("express");
const {
  createCategory,
  assignTicketToCategory,
  getAllCategoriesWithTickets,
} = require("../controllers/categories");
const router = express.Router();

router.post("/create", createCategory);
router.post("/assign-ticket", assignTicketToCategory);
router.get("/ticket-categories", getAllCategoriesWithTickets);

module.exports = router;
