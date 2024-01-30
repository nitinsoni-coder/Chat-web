import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Triggered endpoint", req.originalUrl);
    try {
      return await func(req, res, next);
    } catch (error) {
      console.log("Error handler", error);
      res.status(error.code || 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
      next(error);
    }
  };

export default asyncHandler;
