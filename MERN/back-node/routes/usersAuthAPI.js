const express = require("express");
const router = express.Router();
const {
  registerUsuario,
  loginUsuario,
} = require("../controllers/usersAuthAPI");

router.post("/register", registerUsuario);
router.post("/login", loginUsuario);

module.exports = router;
