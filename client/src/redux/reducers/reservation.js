import {
  BOOK_SEARCH,
  AVAILABLE_ROOMS,
  INC_ADULT,
  INC_CHILD,
  DEC_ADULT,
  DEC_CHILD,
} from "../../utils/types";

const initialState = {
  form: {},
  availableRooms: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOOK_SEARCH:
      return { ...state, form: payload };
    case AVAILABLE_ROOMS:
      return { ...state, availableRooms: payload };
    case INC_ADULT:
      // state.availableRooms.forEach((room) => {
      //   if (payload === room._id) return (room.adult += 1);
      // });
      return {
        ...state,
        availableRooms: [
          ...state.availableRooms,
          state.availableRooms.forEach((room) => {
            if (payload === room._id) room.adult += 1;
          }),
        ],
      };
    case DEC_ADULT:
      state.availableRooms.find((room) => {
        if (payload === room._id) return (room.adult -= 1);
      });
      return { ...state };
    case INC_CHILD:
      state.availableRooms.find((room) => {
        if (payload === room._id) room.child += 1;
      });
      return { ...state };
    case DEC_CHILD:
      state.availableRooms.find((room) => {
        if (payload === room._id) return (room.child -= 1);
      });
      return { ...state };
    default:
      return state;
  }
}
