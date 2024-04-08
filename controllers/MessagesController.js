const MessageSchema = require("../models/MessageModel");
const AuthSchema = require("../models/authModel");
const ChatRoomSchema = require("../models/ChatRoomModel");

const sendMessage = async (req, res) => {
  const { RoomID } = req.params;
  const { Message, SenderId, userone, usertwo } = req.body;

  try {
    const user1 = await AuthSchema.findOne({ _id: userone });
    const user2 = await AuthSchema.findOne({ _id: usertwo });
    const UpdateLastMessage = await ChatRoomSchema.findOneAndUpdate(
      { RoomID: RoomID },
      { LastMessage: Message, Notification: true }
    );

    const useroneName = user1.username;
    const usertwoName = user2.username;

    const Seen = false;

    const message = await MessageSchema.create({
      RoomID,
      Message,
      Seen,
      SenderId,
      userone,
      usertwo,
      useroneName,
      usertwoName,
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err.message);
  }
};

const GetAllMessages = async (req, res) => {
  const { RoomID } = req.params;

  const Message = await MessageSchema.find({ RoomID: RoomID });

  if (Message == []) {
    res.status(404).json({ error: "no messages found" });
  } else {
    res.status(200).json(Message);
    const UpdateLastMessage = await ChatRoomSchema.findOneAndUpdate(
      { RoomID: RoomID },
      { Notification: false }
    );
  }
};

module.exports = {
  sendMessage,
  GetAllMessages,
};
