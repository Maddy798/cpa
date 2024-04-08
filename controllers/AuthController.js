const AuthSchema = require("../models/authModel");

function generateOTP(digit) {
  let OTP = "";
  for (let i = 0; i < digit; i++) {
    OTP = OTP + Math.floor(Math.random() * 10);
  }
  return OTP;
}

const LoginUser = async (req, res) => {
  const { email, password } = req.params;

  const user = await AuthSchema.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      error:
        "we couldn't find an account with the email but feel free to create one",
    });
  }

  if (!user.email == email) {
    return res.status(400).json({
      error: "Wrong credentials",
    });
  }

  if (user.password === password) {
    res.status(200).json({ OTP: generateOTP(6), user });
  } else {
    res.status(400).json({
      error: "Incorrect password",
    });
  }
};

const AutoLogin = async (req, res) => {
  const { userID } = req.params;

  const user = await AuthSchema.findOne({ _id: userID });

  if (!user) {
    res.status(404).json({ error: "no user found" });
  } else {
    res.status(200).json(user);
  }
};

const RegisterUser = async (req, res) => {
  const { email, password, username } = req.body;

  const user = await AuthSchema.findOne({ email: email });

  if (!user) {
    try {
      const Auth = await AuthSchema.create({ email, password, username });
      res.status(200).json({ OTP: generateOTP(6), Auth });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: "account already exists with that email" });
  }
};

const GetAUser = async (req, res) => {
  const { userID } = req.params;

  const user = await AuthSchema.findOne({ _id: userID });

  if (!user) {
    return res.status(404).json({
      error: "no user found",
    });
  } else {
    res.status(200).json(user);
  }
};

const forgetPasswordRequest = async (req, res) => {
  const { email } = req.params;

  const user = await AuthSchema.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      error: "no user found",
    });
  } else {
    res.status(200).json({ OTP: generateOTP(6), user });
  }
};

const UpdatePassword = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  const user = await AuthSchema.findOneAndUpdate(
    { email: email },
    {
      password: password,
    }
  );

  if (!user) {
    return res.status(404).json({
      error: "no user found",
    });
  } else {
    res.status(200).json(user);
  }
};

const FindUsers = async (req, res) => {
  const users = await AuthSchema.find();

  res.status(200).json(users);
};

module.exports = {
  LoginUser,
  RegisterUser,
  GetAUser,
  AutoLogin,
  forgetPasswordRequest,
  UpdatePassword,
  FindUsers,
};
