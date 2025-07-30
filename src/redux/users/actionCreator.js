import actions from "./actions";
import api from "../../utils/apiData";
import { jwtDecode } from "jwt-decode";

const {
  fetchLoggedInUserBegin,
  fetchLoggedInUserSuccess,
  signupUserBegin,
  signupUserSuccess,
  loginUserBegin,
  loginUserSuccess,
  apiError,
  clearMessageError,
} = actions;

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginUserBegin());
      const response = await api.users.loginUser(email, password);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(loginUserSuccess(response.data.user));
      } else {
        dispatch(apiError(response.data.message)); // Dispatch the error message
      }
    } catch (error) {
      console.error("Error during API request:", error);
      dispatch(apiError(error.response.data.message));
    }
  };

export const signupUser =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      dispatch(signupUserBegin());
      const response = await api.users.signupUser(username, email, password);
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const user = jwtDecode(token);
        dispatch(signupUserSuccess(user));
      } else {
        dispatch(apiError(response.data.message)); // Dispatch the error message
      }
    } catch (error) {
      console.error("Error during API request:", error);
      dispatch(apiError(error.response.data.message));
    }
  };

export const fetchLoggedInUser = (user) => async (dispatch) => {
  dispatch(fetchLoggedInUserBegin());
  dispatch(fetchLoggedInUserSuccess(user));
};

export const clearMessage = () => async (dispatch) => {
  dispatch(clearMessageError());
};
