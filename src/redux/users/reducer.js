/* eslint-disable default-param-last */
import actions from "./actions";

const {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  FETCH_LOGGED_IN_USER_BEGIN,
  FETCH_LOGGED_IN_USER_SUCCESS,
  API_ERROR,
  CLEAR_MESSAGE_ERROR,
} = actions;

const initState = {
  loggedInUser: {},
  loading: false,
  success: null,
  error: null,
};

const Users = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedInUser: data,
        loading: false,
        success: true,
      };
    case SIGNUP_USER_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loggedInUser: data,
        loading: false,
        success: true,
      };
    case FETCH_LOGGED_IN_USER_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case FETCH_LOGGED_IN_USER_SUCCESS:
      return {
        ...state,
        loggedInUser: data,
        loading: false,
        success: true,
      };
    case API_ERROR:
      return { ...state, loading: false, error: err, success: false };
    case CLEAR_MESSAGE_ERROR:
      return { ...state, success: null, error: null, loggedInUser: {} };
    default:
      return state;
  }
};

export default Users;
