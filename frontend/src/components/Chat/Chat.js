import React from "react";
import "./Chat.scss";
import Navbar from "./components/Navbar/Navbar";

const Chat = () => {
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">Data</div>
    </div>
  );
};

export default Chat;
