import axios from "axios";
import { StorageKeys } from "../constants/storageKeys";

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "",
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      !error.request.responseURL.includes("login")
    ) {
      localStorage.removeItem(StorageKeys.TOKEN);
    }

    return Promise.reject(error.response || error.message);
  }
);
