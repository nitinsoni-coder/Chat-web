import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  max: 5, // Maximum 5 requests per windowMs
  windowMs: 5 * 60 * 1000, // 5 minutes window
  message:
    "Too many login attempts from this IP, please try again after 5 minutes",
});
