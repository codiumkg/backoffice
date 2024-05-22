import { ROUTES } from "@/constants/routes";
import { StorageKeys } from "@/constants/storageKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const checkIsLoggedIn = useCallback(() => {
    const token = getTokenFromStorage();

    return !!token;
  }, []);

  const getTokenFromStorage = () => {
    const token = localStorage.getItem(StorageKeys.TOKEN);

    return token;
  };

  const setTokenToStorage = (token: string) => {
    localStorage.setItem(StorageKeys.TOKEN, token);
  };

  const removeTokenFromStorage = () => {
    localStorage.removeItem(StorageKeys.TOKEN);
  };

  const logout = useCallback(() => {
    localStorage.clear();
    queryClient.resetQueries();

    navigate(ROUTES.LOGIN, { replace: true });
  }, [navigate, queryClient]);

  return {
    logout,
    getTokenFromStorage,
    setTokenToStorage,
    removeTokenFromStorage,
    checkIsLoggedIn,
  };
}
