const express = require("express");
const cors = require("cors");
const AuthRoutes = require("./routes/auth");
const ChatRoomsRoutes = require("./routes/chatrooms");
const MessagesRoutes = require("./routes/messages");
const mongoose = require("mongoose");

const app = express();
const uri =
  "mongodb+srv://Maddy:Maddy798@chat.jwqudhf.mongodb.net/?retryWrites=true&w=majority&appName=Chat";

app.use(cors());
app.use(express.json());
app.use("/api/auth/", AuthRoutes);
app.use("/api/chatroom/", ChatRoomsRoutes);
app.use("/api/messages/", MessagesRoutes);

mongoose
  .connect(uri)
  .then(() => {
    app.listen(4000, () => {
      console.log("connected to db & listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
