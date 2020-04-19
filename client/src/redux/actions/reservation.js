import axios from "axios";
import { BOOK_SEARCH, AVAILABLE_ROOMS } from "../../utils/types";
import moment from "moment-timezone";

export const bookSearch = ({ checkIn, checkOut, rooms, num = 1 }) => async (
  dispatch
) => {
  const { adults, children } = rooms[num - 1][`room${num}`];
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
      payload: { checkIn, checkOut, rooms },
    });

    dispatch({
      type: AVAILABLE_ROOMS,
      payload: available.data.data,
    });
  } catch (error) {
    console.log("error");
  }
};

// export const setFormData = ({ name, value }) => async dispatch => {
//   try {
//     dispatch({ })
//   } catch (error) {

//   }
// };
