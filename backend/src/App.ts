import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

import connectToDB from "./db/connection";
import config from "./config/index";
import Router from "./Router";

const app = express();

// normal middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: config.REACT_APP_BASE_URL,
    credentials: true,
  })
);

//socket.io configuration
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.REACT_APP_BASE_URL,
  },
});

//connection to database
connectToDB().then(() => {
  // To handle error if express get crashed.
  server.on("error", (error) => {
    console.log("ERR : ", error);
    throw error;
  });

  // listening on port
  server.listen(config.PORT, () => {
    console.log(`⚙️  server is listening on port ${config.PORT}`);
  });
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
