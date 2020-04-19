import uuid from "uuid";
import { SET_ALERT, RESET_ALERT } from "../../utils/types";

export const setAlert = message => async dispatch => {
  const id = uuid.v4();
  dispatch({ type: SET_ALERT, payload: { id, message } });
  // setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: { id } }), timeout);
};

export const resetAlert = () => async dispatch => {
  dispatch({ type: RESET_ALERT });
};
// export const removeAlert = msg => async dispatch => {
//   dispatch({ type: REMOVE_ALERT, payload: { msg } });
// };
