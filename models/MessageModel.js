const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    RoomID: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    Seen: {
      type: Boolean,
      required: true,
    },
    SenderId: {
      type: String,
      required: true,
    },
    userone: {
      type: String,
      required: true,
    },
    usertwo: {
      type: String,
      required: true,
    },
    useroneName: {
      type: String,
      required: true,
    },
    usertwoName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageSchema", MessageSchema);
