import { StorageKeys } from "@/constants/storageKeys";
import { useCallback } from "react";

export default function useAuth() {
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

  return {
    getTokenFromStorage,
    setTokenToStorage,
    removeTokenFromStorage,
    checkIsLoggedIn,
  };
}
