import { QUERY_KEYS } from "@/constants/queryKeys";
import { IRegRequest } from "@/interfaces/regRequest";
import { getRegRequests, removeRegRequest } from "@/requests/reg-requests";
import { useMutation, useQuery } from "@tanstack/react-query";

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

interface MutationQuery {
  onSuccess?: (data: IRegRequest) => void;
  onError?: () => void;
}

export const useRegRequestDeletion = ({
  onError,
  onSuccess,
}: MutationQuery) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => removeRegRequest(id),
    onError,
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};
