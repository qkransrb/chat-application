import { FETCH_CHATS, SET_CURRENT_CHAT } from "../types";

const initialState = {
  chats: [],
  currentChat: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
