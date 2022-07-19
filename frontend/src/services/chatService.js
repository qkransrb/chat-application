import API from "./api";

const ChatService = {
  fetchChats: () => {
    return API.get("/chats")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(`fetchChats - ${error}`);
        throw error;
      });
  },
};

export default ChatService;
