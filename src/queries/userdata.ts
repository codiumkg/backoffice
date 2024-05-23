import { IChangePassword, IUserData } from "../interfaces/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import getUserData from "../requests/auth/getUserData";
import { useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { changePassword } from "@/requests/auth/changePassword";
import { StorageKeys } from "@/constants/storageKeys";

export const useUserData = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<IUserData>({
    queryKey: [QUERY_KEYS.USERDATA],
    queryFn: getUserData,
  });

  const { showErrorNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-expect-error wrong interface for the error, it has the response object
    if (isError && error.status === 401) {
      showErrorNotification("Пожалуйста авторизуйтесь");
      navigate(ROUTES.LOGIN);
    }
  }, [isError, showErrorNotification, navigate, error]);

  useEffect(() => {
    if (data?.role) {
      localStorage.setItem(StorageKeys.ROLE, data.role);
    }
  }, [isLoading, data?.role]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
};

export const useChangePassword = (params?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IChangePassword) => changePassword(data),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    mutate,
    isPending,
  };
};
