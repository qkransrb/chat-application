import API from "./api";

const AuthService = {
  login: (data) => {
    return API.post(`/login`, data)
      .then((response) => {
        setHeadersAndStorage(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`API Login - ${error}`);
        throw error;
      });
  },
  register: (data) => {
    return API.post("/register", data)
      .then((response) => {
        setHeadersAndStorage(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`API Register - ${error}`);
        throw error;
      });
  },
  logout: () => {
    API.defaults.headers["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  update: (data) => {
    const config = {
      headers: {
        "Centent-Type": "application/x-www-form-urlencoded",
      },
    };

    return API.post("/users/update", data, config)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        console.error(`API Update - ${error}`);
        throw error;
      });
  },
};

const setHeadersAndStorage = ({ user, token }) => {
  API.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
};

export default AuthService;
