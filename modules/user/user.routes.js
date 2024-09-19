import express, { Router } from "express";
import { check } from "express-validator";
import { registerUser, loginUser } from "./user.controller.js";

const userRouter = Router();

userRouter.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

userRouter.post(
  "/login",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  loginUser
);

export default userRouter;
