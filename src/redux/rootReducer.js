import { combineReducers } from "redux";
import userAuthSlice from "./userAuthSlice";

const appReducer = combineReducers({
  users: userAuthSlice,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
