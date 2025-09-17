// utils/api.js
import axios from "axios";
import { API_BASE_URL } from "./env";

let authToken = null; // Keep token in memory

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Function to set/update token (called after login)
export const setAuthToken = (token) => {
  authToken = token;
};

// Request interceptor to attach Authorization header
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
