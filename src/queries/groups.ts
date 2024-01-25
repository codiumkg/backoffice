import { QUERY_KEYS } from "@/constants/queryKeys";
import { IGroup } from "../interfaces/auth";
import { createGroup, getGroups } from "../requests/groups";
import { useMutation, useQuery } from "@tanstack/react-query";

interface MutationQuery {
  onSuccess?: (data: IGroup) => void;
  onError?: () => void;
}

export const useGroupMutation = ({ onSuccess, onError }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess,
    onError,
  });

  return {
    data,
    isPending,
    mutate,
  };
};

export const useGroupsQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: getGroups,
    queryKey: [QUERY_KEYS.GROUPS],
    refetchOnWindowFocus: false,
    staleTime: 35 * 1000,
  });

  return {
    data,
    isLoading,
  };
};
