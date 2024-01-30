import config from "../config/index";
import User from "../models/user.schema";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import JWT, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/authInterfaces";
import { CustomRequest } from "./commonInterface";



export const isAuth = asyncHandler(
  async (req: CustomRequest<IUser>, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }

    try {
      const decodedToken = JWT.verify(
        token,
        config.ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
