import express from "express";

import { login, register } from "../controllers/AuthController";
import { authLimiter } from "../middlewares/rateLimiterMiddleware";

const authRouter = express.Router();

authRouter.route("/login").post(authLimiter, login);
authRouter.route("/register").post(authLimiter, register);

export default authRouter;
