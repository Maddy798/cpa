const express = require("express");
const cors = require("cors");
const AuthRoutes = require("./routes/auth");
const ChatRoomsRoutes = require("./routes/chatrooms");
const MessagesRoutes = require("./routes/messages");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51PiTHVGPnsd4Z1tXCr7V1qiKxXtZm5w1DqadxPNixu2VYhxB1DSnaV5LhDtipgfJ9tjUXXJKY47GdVwNyg6wgwvh00l6d53qS6"
);

const app = express();
const uri =
  "mongodb+srv://Maddy:Maddy798@chat.jwqudhf.mongodb.net/?retryWrites=true&w=majority&appName=Chat";

app.use(cors());
app.use(express.json());
app.use("/api/auth/", AuthRoutes);
app.use("/api/chatroom/", ChatRoomsRoutes);
app.use("/api/messages/", MessagesRoutes);
app.use("/api/messages/", MessagesRoutes);

app.get("/", (req, res) => {
  res.send({ error: "hehe" });
});

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log(paymentIntent);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

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
