import React from "react";
import "./Message.scss";

const Message = ({ user, currentChat, message, index }) => {
  const determineMargin = () => {
    if (index + 1 === currentChat.Messages.length) {
      return;
    }
    return message.fromUserId === currentChat.Messages[index + 1].fromUserId
      ? "mb-5"
      : "mb-10";
  };

  return (
    <div
      className={`message ${determineMargin()} ${
        message.fromUserId === user.id ? "creator" : ""
      }`}
    >
      <div
        className={message.fromUserId === user.id ? "owner" : "other-person"}
      >
        {message.fromUserId !== user.id ? (
          <h6 className="m-0">{`${message.User.firstName} ${message.User.lastName}`}</h6>
        ) : null}
        {message.type === "text" ? (
          <p className="m-0">{message.message}</p>
        ) : (
          <img src={message.message} alt="user upload" />
        )}
      </div>
    </div>
  );
};

export default Message;
