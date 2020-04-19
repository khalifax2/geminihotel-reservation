import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import reservation from "./reservation";
import auth from "./auth";
import alert from "./alert";
import modal from "./modal";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["reservation", "auth", "alert", "modal"]
};

const rootReducer = combineReducers({
  reservation,
  auth,
  alert,
  modal
});

export default persistReducer(persistConfig, rootReducer);
