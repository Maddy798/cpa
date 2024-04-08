const express = require("express");
const {
  LoginUser,
  RegisterUser,
  GetAUser,
  AutoLogin,
  forgetPasswordRequest,
  UpdatePassword,
  FindUsers,
} = require("../controllers/AuthController");

const router = express.Router();

router.get("/login/:email/:password/", LoginUser);

router.post("/register", RegisterUser);

router.get("/getuser/:userID/", GetAUser);

router.get("/Search/", FindUsers);

router.get("/autoLogin/:userID/", AutoLogin);

router.get("/forgetpasswordrequest/:email", forgetPasswordRequest);

router.post("/updatepassword/:email", UpdatePassword);

module.exports = router;
