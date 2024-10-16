const express = require("express");
const {
  postSignup,
  postLogin,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUSer,
} = require("../controllers/user");
const Auth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.get("/users", Auth, getAllUsers);
router.get("/users/:id", Auth, getSingleUser);
router.put("/users/:id", Auth, updateUser);
router.delete("/users/:id", Auth, deleteUSer);

module.exports = router;
