import { IUserData } from "../interfaces/auth";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import getUserData from "../requests/auth/getUserData";
import { useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const useUserData = () => {
  const { data, isFetching, isSuccess, isError, error } = useQuery<IUserData>({
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

  return {
    data,
    isFetching,
    isSuccess,
    isError,
  };
};
