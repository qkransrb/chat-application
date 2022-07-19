import React, { Fragment, useState } from "react";
import "./ChatHeader.scss";
import { userStatus } from "../../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatHeader = ({ currentChat }) => {
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);

  return (
    <Fragment>
      <div id="chatter">
        {currentChat.Users.map((user) => (
          <div key={user.id} className="chatter-info">
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <div className="chatter-status">
              <span className={`online-status ${userStatus(user)}`}></span>
            </div>
          </div>
        ))}
      </div>
      <FontAwesomeIcon
        icon={[`fas`, `ellipsis-v`]}
        className="fa-icon"
        onClick={() => setShowChatOptions(!showChatOptions)}
      />
      {showChatOptions ? (
        <div id="settings">
          <div>
            <FontAwesomeIcon icon={[`fas`, `user-plus`]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>

          {currentChat.type === "group" ? (
            <div>
              <FontAwesomeIcon
                icon={[`fas`, `sign-out-alt`]}
                className="fa-icon"
              />
              <p>Leave chat</p>
            </div>
          ) : null}

          <div>
            <FontAwesomeIcon icon={[`fas`, `trash`]} className="fa-icon" />
            <p>Delete chat</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ChatHeader;
