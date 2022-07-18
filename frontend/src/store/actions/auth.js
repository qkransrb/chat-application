import AuthService from "../../services/authService";
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from "../types";

export const login = (params, history) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      dispatch({ type: LOGIN, payload: data });
      history.push("/");
    })
    .catch((error) => {
      console.error(`[action] login - ${error}`);
    });
};

export const register = (params, history) => (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      dispatch({ type: REGISTER, payload: data });
      history.push("/");
    })
    .catch((error) => {
      console.error(`[action] register - ${error}`);
    });
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};

export const updateProfile = (params) => (dispatch) => {
  return AuthService.update(params)
    .then((data) => {
      dispatch({ type: UPDATE_PROFILE, payload: data });
    })
    .catch((error) => {
      console.error(`[action] updateProfile - ${error}`);
    });
};
