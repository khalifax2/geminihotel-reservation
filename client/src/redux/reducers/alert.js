import { SET_ALERT, REMOVE_ALERT, RESET_ALERT } from "../../utils/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      if (payload) {
        const found = state.find(el => el.message === payload.message);
        return found === undefined ? [...state, payload] : state;
      }
      break;
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload.id);
    case RESET_ALERT:
      return [];
    default:
      return state;
  }
}

// const state = [{ message: "Please provide email and password" }, { message: "Please provide email and password"}];
// for (let i = 0; i < payload.length; i++) {
//   for (let x in payload[i]) {
//     console.log(payload[i][x]);
//   }
// }
