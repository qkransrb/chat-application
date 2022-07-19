import React from "react";
import "./Messenger.scss";
import { useSelector } from "react-redux";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageBox from "../MessageBox/MessageBox";
import MessageInput from "../MessageInput/MessageInput";

const Messenger = () => {
  const { currentChat } = useSelector((state) => state.chatReducer);

  const activeChat = () => {
    return Object.keys(currentChat).length > 0;
  };

  return (
    <div id="messenger" className="shadow-light">
      {activeChat() ? (
        <div id="messenger-wrap">
          <ChatHeader currentChat={currentChat} />
          <hr />
          <MessageBox currentChat={currentChat} />
          <MessageInput currentChat={currentChat} />
        </div>
      ) : (
        <p>No active chat</p>
      )}
    </div>
  );
};

export default Messenger;
