import { QUERY_KEYS } from "@/constants/queryKeys";
import { IGroup } from "../interfaces/auth";
import {
  createGroup,
  getGroupDetails,
  getGroups,
  removeGroup,
} from "../requests/groups";
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

export const useGroupDetailsQuery = (id: number) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getGroupDetails(id),
    queryKey: [QUERY_KEYS.GROUPS, id],
  });

  return {
    data,
    isLoading,
  };
};

export const useGroupDeletion = (
  id: number,
  { onSuccess, onError }: MutationQuery
) => {
  const { isPending } = useMutation({
    mutationFn: () => removeGroup(id),
    onError,
    onSuccess,
  });

  return {
    isPending,
  };
};
