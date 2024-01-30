import { Request } from "express";
// Define a custom type extending the Express Request type
export interface CustomRequest<T> extends Request {
  user?: T;
}
