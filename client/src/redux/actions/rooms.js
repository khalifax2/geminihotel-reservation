import axios from "axios";

export const fetchAvailableRooms = () => async dispatch => {
  try {
    const rooms = axios.get("/");
  } catch (error) {}
};
