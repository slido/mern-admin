import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
  (config: AxiosRequestConfig) => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

api.interceptors.response.use(
  
  (response: AxiosResponse) => response,
  error => {
    if (error.response.status === 401) {
      // Handle unauthorized errors
      console.log('Unauthorized. Redirecting to login...');
      // Redirect user to login page
      //window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);



const { get, post, put, delete: destroy } = api;
export { get, post, put, destroy };
export default api;
