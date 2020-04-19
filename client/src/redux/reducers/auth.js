import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER
} from "../../utils/types";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return { ...state, user: payload, isAuthenticated: true, loading: false };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };

    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false, loading: true };

    default:
      return state;
  }
}
