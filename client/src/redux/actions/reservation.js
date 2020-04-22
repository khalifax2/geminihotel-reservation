import axios from "axios";
import {
  BOOK_SEARCH,
  AVAILABLE_ROOMS,
  INC_ADULT,
  INC_CHILD,
  DEC_ADULT,
  DEC_CHILD,
  SELECT_ROOM,
} from "../../utils/types";
import moment from "moment-timezone";

export const bookSearch = ({ checkIn, checkOut, rooms, num = 1 }) => async (
  dispatch
) => {
  const { adults, children } = rooms[num - 1][`room`];
  const start = moment.tz(checkIn, "Asia/Manila");
  const end = moment.tz(checkOut, "Asia/Manila");
  const capacity = parseInt(adults) + parseInt(children);
  // console.log(start);
  try {
    const available = await axios.get(
      `/api/book/start/${start.format()}/end/${end.format()}/capacity/${capacity}`
    );
    console.log(available);

    dispatch({
      type: BOOK_SEARCH,
      payload: { checkIn, checkOut },
    });

    dispatch({
      type: AVAILABLE_ROOMS,
      payload: available.data.data,
    });
  } catch (error) {
    console.log("error");
  }
};

export const setCount = (id, name) => (dispatch) => {
  switch (name) {
    case INC_ADULT:
      dispatch({ type: INC_ADULT, payload: id });
      break;
    case DEC_ADULT:
      dispatch({ type: DEC_ADULT, payload: id });
      break;
    case INC_CHILD:
      dispatch({ type: INC_CHILD, payload: id });
      break;
    case DEC_CHILD:
      dispatch({ type: DEC_CHILD, payload: id });
      break;
  }
};

export const selectRoom = (id) => (dispatch) => {
  dispatch({ type: SELECT_ROOM, payload: id });
};
