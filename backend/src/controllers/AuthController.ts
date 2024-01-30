import User from "../models/user.schema";
import { Request, Response } from "express";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import { CookieOptions, IUser } from "../interfaces/authInterfaces";
import { CustomRequest } from "../middlewares/commonInterface";
import JWT, { JwtPayload } from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      "something went wrong while generating access token and refresh token"
    );
  }
};

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

  const user = await User.findOne({ email });

  console.log("--user---", user);

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  // Compare the incoming password with hashed password
  const isPasswordValid = await user?.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
};

export const logout = async (req: CustomRequest<IUser>, res: Response) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  console.log("--req.cookies?.accessToken---", req.cookies?.accessTokens);

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "user is logged out successfully"));
};

const refreshAccessToken = async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = JWT.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ) as JwtPayload;
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // check if incoming refresh token is same as the refresh token attached in the user document
    // This shows that the refresh token is used or not
    // Once it is used, we are replacing it with new refresh token below
    if (incomingRefreshToken !== user?.refreshToken) {
      // If token is valid but is used already
      throw new ApiError(401, "Refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user.id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
};
