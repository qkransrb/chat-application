import React, { useState } from "react";
import "./MessageInput.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageInput = ({ currentChat }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const { user } = useSelector((state) => state.authReducer);

  const handleMessage = (e) => {
    setMessage(e.target.value);

    // notify other users that this user is typing something
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) {
      return;
    }

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUserId: user.id,
      toUserId: currentChat.Users.map((user) => user.id),
      chatId: currentChat.id,
      message: imageUpload ? image : message,
    };

    setMessage("");
    setImage("");

    // send message with socket
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          onChange={handleMessage}
          onKeyDown={(e) => handleKeyDown(e, false)}
          placeholder="Message..."
        />
        <FontAwesomeIcon icon={[`far`, `smile`]} className="fa-icon" />
      </div>
    </div>
  );
};

export default MessageInput;
