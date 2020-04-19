import { BOOK_SEARCH, AVAILABLE_ROOMS } from "../../utils/types";

const initialState = {
  form: {},
  availableRooms: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOOK_SEARCH:
      return { ...state, form: payload };
    case AVAILABLE_ROOMS:
      return { ...state, availableRooms: payload };
    default:
      return state;
  }
}
