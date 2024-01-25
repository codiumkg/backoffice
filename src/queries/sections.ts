import { QUERY_KEYS } from "@/constants/queryKeys";
import { getSections } from "@/requests/sections";
import { useQuery } from "@tanstack/react-query";

export const useSectionsQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSections,
    queryKey: [QUERY_KEYS.SECTIONS],
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
  };
};
