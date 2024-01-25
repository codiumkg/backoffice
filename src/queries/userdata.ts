import { IUserData } from "../interfaces/auth";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import getUserData from "../requests/auth/getUserData";

export const useUserData = () => {
  const { data, isFetching, isSuccess, isError } = useQuery<IUserData>({
    queryKey: [QUERY_KEYS.USERDATA],
    queryFn: getUserData,
  });

  return {
    data,
    isFetching,
    isSuccess,
    isError,
  };
};
