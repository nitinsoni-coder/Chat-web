import { Types } from "mongoose";

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none" | undefined;
}

export interface IUser {
  _id: Types.ObjectId;
  avatar: {
    publicUrl: string;
  };
  username: string;
  email: string;
  role: string;
}
