import express from "express";

import { login, logout, register } from "../controllers/AuthController";
import { authLimiter } from "../middlewares/rateLimiterMiddleware";
import { isAuth } from "../middlewares/authMiddleware";
import asyncHandler from "../utils/asyncHandler";

const authRouter = express.Router();

authRouter.route("/login").post(authLimiter, asyncHandler(login));
authRouter.route("/register").post(authLimiter, asyncHandler(register));
authRouter.route("/logout").post(isAuth, asyncHandler(logout));

export default authRouter;
