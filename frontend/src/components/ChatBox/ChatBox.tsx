import React, { useEffect, useMemo, useState } from "react";
import { IoMdSend } from "react-icons/io";

import { io, Socket } from "socket.io-client";

import "./chatbox.scss";

const ChatBox = () => {
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [socketId, setSocketId] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  // const [roomName, setRoomName] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    socket.emit("message", { message, room });
    setMessage("");
  };

  console.log("--messages---", messages);

  console.log("--socketId---", socketId);

  const socket: Socket = useMemo(() => {
    return io("http://localhost:9000");
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id as string);
      console.log("connected", socket.id);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((message) => [...message, data.message]);
    });

    // return  () => {
    //   socket.disconnect();
    // }
  }, []);
  return (
    <div className="chatbox-container">
      {messages.map((message, index) => (
        <p key={index} className="messageContent">
          {message}
        </p>
      ))}
      <form onSubmit={handleSubmit} className="chatForm">
        <h4>{socketId}</h4>
        <input
          type="text"
          name="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="enter room id"
        />
        <input
          type="text"
          name="message"
          value={message}
          className="messageInputField"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send message"
        />

        <button type="submit" className="sendBtn">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
