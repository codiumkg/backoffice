import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { StorageKeys } from "../constants/storageKeys";
import { ROUTES } from "@/constants/routes";

interface InterceptorParams {
  navigate?: NavigateFunction;
  showNotification?: (message: string) => void;
}

export class ApiError extends Error {
  statusCode;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "",
});

export const requestInterceptor = () =>
  request.interceptors.request.use((config) => {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

export const responseInterceptor = ({
  navigate,
  showNotification,
}: InterceptorParams) =>
  request.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 403) {
        showNotification?.("Нет доступа к ресурсу");

        throw new ApiError("Нет доступа к ресурсу", 403);
      } else if (
        error.response.status === 401 &&
        !error.request.responseURL.includes("login")
      ) {
        localStorage.removeItem(StorageKeys.TOKEN);

        navigate?.(ROUTES.LOGIN);
        showNotification?.("Пожалуйста авторизуйтесь");

        throw new ApiError("Пожалуйста авторизуйтесь", 401);
      }

      return Promise.reject(error.response || error.message);
    }
  );

export const setInterceptors = ({
  navigate,
  showNotification,
}: InterceptorParams) => {
  requestInterceptor();
  responseInterceptor({ navigate, showNotification });
};

export const cleanInterceptors = () => {
  request.interceptors.request.eject(requestInterceptor());
  request.interceptors.response.eject(responseInterceptor({}));
};
