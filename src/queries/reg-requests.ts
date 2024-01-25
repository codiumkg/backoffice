import { QUERY_KEYS } from "@/constants/queryKeys";
import { getRegRequests } from "@/requests/reg-requests";
import { useQuery } from "@tanstack/react-query";

export const useRegRequestsQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getRegRequests(),
    queryKey: [QUERY_KEYS.REG_REQUESTS],
  });

  return {
    data,
    isLoading,
  };
};
