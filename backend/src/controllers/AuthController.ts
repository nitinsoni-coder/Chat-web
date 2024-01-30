import User from "../models/user.schema";
import JWT from "jsonwebtoken";
import { Request, Response } from "express";
// import {
//   generateAccesstoken,
//   generateRefreshtoken,
// } from "../src/utils/sendToken.js";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!(username || email || password)) {
    res.status(400).json({
      success: false,
      message: "please provide all the details",
    });
  }
  
  await User.create(req.body);

  res.status(200).json({
    success: true,
    message: "user is registered successfully",
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("---req.body----", req.body);

  if (!email || !password) {
    return res.status(401).json({
      message: "please provide all the details",
    });
  }

  const user = await User.findOne({ email, password });

  console.log("--user---", user);

  const accessToken = JWT.sign(
    { _id: user._id, email: user.email },
    "jwt-access-token-secret-key",
    {
      expiresIn: "1m",
    }
  );

  const refreshToken = JWT.sign(
    { _id: user._id, email: user.email },
    "jwt-refresh-token-secret-key",
    {
      expiresIn: "5m",
    }
  );

  res.cookie("accessToken", accessToken, { maxAge: 60000 });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 300000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "user is logged in successfully",
  });
};
