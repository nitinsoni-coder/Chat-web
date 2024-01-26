import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ChatList from "../../components/ChatList/ChatList";
import ChatBox from "../../components/ChatBox/ChatBox";

import "./chat.scss";

const Chat = () => {
  // const handleJoinRoomHandler = (e: React.SyntheticEvent<EventTarget>) => {
  //   e.preventDefault();

  //   socket.emit("join-room", roomName);
  //   setRoomName("");
  // };

  return (
    <>
      <Navbar />

      <div className="chat-container">
        <ChatList />
        <ChatBox />
        {/* <form onSubmit={handleJoinRoomHandler}>
        <h5>Join Room</h5>
        <input
          type="text"
          name="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="enter room name"
        />

        <button type="submit">submit</button>
      </form>

  */}
      </div>
    </>
  );
};

export default Chat;
