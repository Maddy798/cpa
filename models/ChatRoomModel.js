const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
  {
    Owner: {
      type: String,
      required: true,
    },
    RoomID: {
      type: String,
      required: true,
    },
    LastMessage: {
      type: String,
      required: true,
    },
    useroneName: {
      type: String,
      required: true,
    },
    userone: {
      type: String,
      required: true,
    },
    usertwoName: {
      type: String,
      required: true,
    },
    usertwo: {
      type: String,
      required: true,
    },
    Notification: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatRoomSchema", ChatRoomSchema);
