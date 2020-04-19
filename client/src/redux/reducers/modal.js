import {
  HANDLE_CLOSE_LOGIN,
  HANDLE_SHOW_LOGIN,
  HANDLE_SHOW_SIGNUP,
  HANDLE_CLOSE_SIGNUP,
  FORM_TYPE
} from "../../utils/types";

const initialState = { showLogin: false, showSignup: false, formType: "login" };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HANDLE_SHOW_LOGIN:
      return { ...state, showLogin: payload };
    case HANDLE_CLOSE_LOGIN:
      return { ...state, showLogin: payload };
    case HANDLE_SHOW_SIGNUP:
      return { ...state, showSignup: payload };
    case HANDLE_CLOSE_SIGNUP:
      return { ...state, showSignup: payload };
    case FORM_TYPE:
      return { ...state, formType: payload };
    default:
      return state;
  }
}
