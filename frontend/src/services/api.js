import axios from "axios";
import store from "../store";
import { logout } from "../store/actions/auth";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")) || ""}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status !== 401) {
      throw error;
    }

    if (typeof error.response.data.message !== "undefined") {
      if (error.response.data.message.includes("expired")) {
        store.dispatch(logout());
        throw error;
      }
    }
  }
);

export default API;
