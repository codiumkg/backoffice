import { StorageKeys } from "../constants/storageKeys";
import axios from "axios";

export class ApiError extends Error {
  statusCode;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      throw new ApiError("Нет доступа к ресурсу", 403);
    } else if (error.response.status === 401) {
      localStorage.removeItem(StorageKeys.TOKEN);

      throw new ApiError("Пожалуйста авторизуйтесь", 401);
    } else {
      return Promise.reject(error.response || error.message);
    }
  }
);
