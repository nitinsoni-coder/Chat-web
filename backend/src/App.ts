import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import connectToDB from "./db/connection";
import config from "./config/index";
import Router from "./Router";

const app = express();

// normal middleware
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

//connection to database
connectToDB();

//socket.io configuration
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", (socket) => {
  // console.log(`user is connected`);
  // console.log("ID", socket.id);
  // socket.emit("message", `Welcome to the server ${socket.id}`);
  // socket.broadcast.emit("message", `${socket.id} joined the server`);

  // socket.on("disconnect", () => {
  //   console.log(`user is diconnected ${socket.id}`);
  // });

  console.log(`user is connected ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);
    // io.emit("receive-message", data);
    // socket.broadcast.emit("receive-message", data);
    io.to(data.room).emit("receive-message", data);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`user joined room ${room}`);
  });
});

app.use("/api/v1", Router);

server.listen(config.PORT, () => {
  console.log(`⚙️  server is listening on port ${config.PORT}`);
});
