import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "./rootReducer";
import { thunk } from "redux-thunk";

const composeEnhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, composeEnhancer);

export default store;
