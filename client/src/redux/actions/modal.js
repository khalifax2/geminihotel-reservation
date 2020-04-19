import {
  HANDLE_SHOW_LOGIN,
  HANDLE_CLOSE_LOGIN,
  HANDLE_SHOW_SIGNUP,
  HANDLE_CLOSE_SIGNUP,
  FORM_TYPE,
  RESET_ALERT
} from "../../utils/types";

export const handleShowLogin = () => async dispatch => {
  dispatch({ type: HANDLE_SHOW_LOGIN, payload: true });
};

export const handleCloseLogin = () => async dispatch => {
  dispatch({ type: HANDLE_CLOSE_LOGIN, payload: false });
  dispatch({ type: RESET_ALERT });
};

export const handleShowSignup = () => async dispatch => {
  dispatch({ type: HANDLE_SHOW_SIGNUP, payload: true });
  dispatch(handleCloseLogin());
};

export const handleCloseSignup = () => async dispatch => {
  dispatch({ type: HANDLE_CLOSE_SIGNUP, payload: false });
  dispatch(formType("login"));
  dispatch({ type: RESET_ALERT });
}; 

export const formType = formType => async dispatch => {
  dispatch({ type: FORM_TYPE, payload: formType });
};
