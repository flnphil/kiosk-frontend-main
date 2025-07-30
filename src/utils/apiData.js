import axios from "axios";

const getToken = () => localStorage.getItem("token");
const api = {
  axiosInstance: axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL,
  }),
  users: {
    loginUser: async (email, password) =>
      api.axiosInstance.post(`/login`, { email: email, password: password }),
    signupUser: async (name, email, password) =>
      api.axiosInstance.post(`/signup`, {
        email,
        password,
        name,
      }),
    signupAdmin: async (name, email, password) =>
      api.axiosInstance.post(`/admin-signup`, {
        email,
        password,
        name,
      }),
  },
};

// Add an interceptor to include the token in the Authorization header
api.axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
