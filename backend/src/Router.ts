import express from "express";
import AuthRoutes from "./routes/AuthRoutes";

const app = express();

app.use("/auth", AuthRoutes);

export default app;
