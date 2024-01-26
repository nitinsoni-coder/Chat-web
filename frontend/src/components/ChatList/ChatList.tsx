import React from "react";

import "./chatlist.scss";
const ChatList = () => {
  return (
    <div className="chatlist-container">
      <div>
        <div>
          <span>Chats</span>
          <div>
            <span>New</span>
            <span>Filter</span>
          </div>
        </div>

        <div>
          <input type="search" name="username" />
        </div>
      </div>
      <div>
        <div>
          <img src="https://via.placeholder.com/200x200.png" alt="avatar" />
          <div>
            <span>Nitin Soni</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ChatList;
