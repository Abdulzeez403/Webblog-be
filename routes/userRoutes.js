const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  CurrentUser,
} = require("../control/userControl");
const ValidateHandler = require("../middleware/validatehandler")

router.post("/Register", RegisterUser);
router.get("/login", LoginUser);
router.get("/current", ValidateHandler, CurrentUser);
module.exports = router;
