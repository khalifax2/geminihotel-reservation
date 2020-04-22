import {
  BOOK_SEARCH,
  AVAILABLE_ROOMS,
  INC_ADULT,
  INC_CHILD,
  DEC_ADULT,
  DEC_CHILD,
  SELECT_ROOM,
} from "../../utils/types";

const initialState = {
  form: {},
  availableRooms: [],
  selectedRooms: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOOK_SEARCH:
      return { ...state, form: payload };
    case AVAILABLE_ROOMS:
      return { ...state, availableRooms: payload };
    case SELECT_ROOM:
      return {
        ...state,
        selectedRooms: [
          ...state.selectedRooms,
          state.availableRooms.find((room) => room._id === payload),
        ],
        availableRooms: state.availableRooms.filter(
          (room) => room._id !== payload
        ),
      };
    case INC_ADULT:
      state.availableRooms.map((room) => {
        if (payload === room._id) room.adult++;
      });
      return { ...state, availableRooms: [...state.availableRooms] };
    case DEC_ADULT:
      state.availableRooms.find((room) => {
        if (payload === room._id) {
          if (room.adult > 0) room.adult--;
        }
      });
      return { ...state, availableRooms: [...state.availableRooms] };
    case INC_CHILD:
      state.availableRooms.find((room) => {
        if (payload === room._id) room.child++;
      });
      return { ...state, availableRooms: [...state.availableRooms] };
    case DEC_CHILD:
      state.availableRooms.find((room) => {
        if (payload === room._id) {
          if (room.child > 0) room.child--;
        }
      });
      return { ...state, availableRooms: [...state.availableRooms] };
    default:
      return state;
  }
}
