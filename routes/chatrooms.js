const express = require("express");
const {
  CreateChatRoom,
  getAllChatRooms,
} = require("../controllers/ChatRoomsController");

const router = express.Router();

router.post("/newchat/", CreateChatRoom);

router.get("/getchatrooms/:userid", getAllChatRooms);

module.exports = router;
