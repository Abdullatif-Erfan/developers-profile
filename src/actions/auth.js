import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// User Registration
export const registeration = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login
export const login = (password, email) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ password, email });
  try {
    const res = await axios.post("/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
