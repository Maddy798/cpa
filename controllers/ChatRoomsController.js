const { v4 } = require("uuid");
const mongoose = require("mongoose");
const ChatRoomSchema = require("../models/ChatRoomModel");
const AuthSchema = require("../models/authModel");

function generateOTP() {
  let RoomId = "";
  for (let i = 0; i < 25; i++) {
    RoomId = RoomId + Math.floor(Math.random() * 10);
  }
  return RoomId;
}

const CreateChatRoom = async (req, res) => {
  const { Owner, userone, usertwo } = req.body;

  const ExistingChatRoom = await ChatRoomSchema.findOne({
    userone: userone,
    usertwo: usertwo,
  });

  const UserOne = await AuthSchema.findOne({
    _id: userone,
  });

  const UserTwo = await AuthSchema.findOne({
    _id: usertwo,
  });

  const Notification = false;

  if (ExistingChatRoom == null) {
    const RoomID = generateOTP();
    const LastMessage = "Say Hi";
    const useroneName = UserOne.username;
    const usertwoName = UserTwo.username;
    const chatRoom = await ChatRoomSchema.create({
      Owner,
      RoomID,
      LastMessage,
      useroneName,
      userone,
      usertwoName,
      usertwo,
      Notification,
    });
    const otherUserData = {
      Owner: usertwo,
      RoomID: RoomID,
      LastMessage: LastMessage,
      useroneName: usertwoName,
      userone: usertwo,
      usertwoName: useroneName,
      usertwo: userone,
      Notification,
    };
    const OtheruserchatRoom = await ChatRoomSchema.create(otherUserData);
    res.status(200).json(chatRoom);
    return;
  }

  res.status(200).json(ExistingChatRoom);
};

const getAllChatRooms = async (req, res) => {
  const { userid } = req.params;

  const ChatRoom = await ChatRoomSchema.find({
    Owner: userid,
  });

  if (!ChatRoom) {
    res.status(404).json({ error: "no chat room found" });
  } else {
    res.status(200).json(ChatRoom);
  }
};

module.exports = {
  CreateChatRoom,
  getAllChatRooms,
};
