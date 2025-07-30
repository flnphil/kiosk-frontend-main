const actions = {
  LOGIN_USER_BEGIN: "LOGIN_USER_BEGIN",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  SIGNUP_USER_BEGIN: "SIGNUP_USER_BEGIN",
  SIGNUP_USER_SUCCESS: "SIGNUP_USER_SUCCESS",

  FETCH_LOGGED_IN_USER_BEGIN: "FETCH_LOGGED_IN_USER_BEGIN",
  FETCH_LOGGED_IN_USER_SUCCESS: "FETCH_LOGGED_IN_USER_SUCCESS",

  API_ERROR: "API_ERROR",
  CLEAR_MESSAGE_ERROR: "CLEAR_MESSAGE_ERROR",

  fetchLoggedInUserBegin: () => ({
    type: actions.FETCH_LOGGED_IN_USER_BEGIN,
  }),

  fetchLoggedInUserSuccess: (data) => ({
    type: actions.FETCH_LOGGED_IN_USER_SUCCESS,
    data,
  }),

  signupUserBegin: () => ({
    type: actions.SIGNUP_USER_BEGIN,
  }),

  signupUserSuccess: (data) => ({
    type: actions.SIGNUP_USER_SUCCESS,
    data,
  }),

  loginUserBegin: () => ({
    type: actions.LOGIN_USER_BEGIN,
  }),

  loginUserSuccess: (data) => ({
    type: actions.LOGIN_USER_SUCCESS,
    data,
  }),

  apiError: (errorMessage) => ({
    type: actions.API_ERROR,
    err: errorMessage,
  }),

  clearMessageError: () => ({
    type: actions.CLEAR_MESSAGE_ERROR,
  }),
};

export default actions;
