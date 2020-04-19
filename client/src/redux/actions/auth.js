import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER
} from "../../utils/types";
import { setAlert } from "./alert";

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth/me");
    console.log(res);
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const login = formData => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/auth/login", body, config);
    console.log(res);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data;
    console.log(errors);
    if (errors) {
      dispatch(setAlert(errors.message));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const signup = formData => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/auth/signup", body, config);

    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      const err = errors.message.split(". ");
      err.forEach(el => dispatch(setAlert(el)));
    }

    dispatch({ type: SIGNUP_FAIL });
  }
};
