import axios from "axios";
import useAuthStore from "@/store/auth";

// Create an Axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_APP_API_URL,
  withCredentials: true, // Required to send cookies
  headers: { Accept: "application/json" },
});

// Get the access token from local storage
const getToken = (): string | null => localStorage.getItem("token");

// Set or remove the Authorization token globally
export const setAuthToken = (token?: string) => {
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token); // Save the token
  } else {
    delete http.defaults.headers.common.Authorization;
    localStorage.removeItem("token"); // Remove the token
  }
};

// Request interceptor to add the access token
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const { setIsNotAuthenticate } = useAuthStore.getState();
      setIsNotAuthenticate(true);
    }

    return Promise.reject(error);
  }
);

export default http;
