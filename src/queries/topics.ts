import { QUERY_KEYS } from "@/constants/queryKeys";
import { getTopics } from "@/requests/topics";
import { useQuery } from "@tanstack/react-query";

export const useTopicsQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: getTopics,
    queryKey: [QUERY_KEYS.TOPICS],
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
  };
};
