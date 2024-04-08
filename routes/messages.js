const express = require("express");
const {
  sendMessage,
  GetAllMessages,
} = require("../controllers/MessagesController");

const router = express.Router();

router.post("/send/:RoomID", sendMessage);
router.get("/getmessages/:RoomID", GetAllMessages);

module.exports = router;
