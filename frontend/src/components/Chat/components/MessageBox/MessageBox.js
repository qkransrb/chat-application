import React from "react";
import "./MessageBox.scss";
import { useSelector } from "react-redux";
import Message from "../Message/Message";

const MessageBox = ({ currentChat }) => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div id="msg-box">
      {currentChat.Messages.map((message, index) => (
        <Message
          key={message.id}
          user={user}
          currentChat={currentChat}
          message={message}
          index={index}
        />
      ))}
    </div>
  );
};

export default MessageBox;
