import React from "react";
import "./FriendList.scss";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../Friend/Friend";
import { setCurrentChat } from "../../../../store/actions/chat";

const FriendList = () => {
  const dispatch = useDispatch();

  const { chats } = useSelector((state) => state.chatReducer);

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  return (
    <div id="friends" className="shadow-light">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button type="button">ADD</button>
      </div>

      <hr />

      <div id="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Friend key={chat.id} chat={chat} click={() => openChat(chat)} />
          ))
        ) : (
          <p id="no-chat">No friends added.</p>
        )}
      </div>
    </div>
  );
};

export default FriendList;
