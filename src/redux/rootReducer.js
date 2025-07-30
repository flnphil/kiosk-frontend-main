import Users from "./users/reducer";

import { combineReducers } from "redux";

const appReducer = combineReducers({
  Users,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
