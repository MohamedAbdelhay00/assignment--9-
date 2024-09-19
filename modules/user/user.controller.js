import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import User from "../../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

console.log("Secret Key: ", secretKey);

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ username, email, password });
    await user.save();

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;

    // Send OTP email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mohamed.a.abdelhay55@gmail.com",
        pass: "kqgz eity gnoo lyqf",
      },
    });

    const mailOptions = {
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ msg: "User registered successfully, check your email for OTP" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
