const express = require("express");
const ValidateHandler = require("../middleware/validatehandler");

const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  CurrentUser,
} = require("../control/userControl");
// const VerifyLogin = require("../middleware/verifyLogin");
router.post("/Login",  LoginUser);
router.post("/Register", RegisterUser);
router.get("/current", ValidateHandler, CurrentUser);
module.exports = router;
