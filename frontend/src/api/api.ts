import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { store, useAppSelector } from "../state/store";

// Helper function that returns a Promise that resolves with the token
export const getToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = store.getState().user;
    if (user && user.token) {
      resolve(user.token);
    } else {
      reject(new Error("User not authenticated"));
    }
  });
};

export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Create a new instance for login and registration requests
export const authApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await getToken();
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized errors
      console.log("Unauthorized. Redirecting to login...");
      // Redirect user to login page
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

const { get, post, put, delete: destroy } = api;
export { get, post, put, destroy };
export default api;
