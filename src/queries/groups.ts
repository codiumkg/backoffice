import { QUERY_KEYS } from "@/constants/queryKeys";
import { IGroup } from "@/interfaces/group";
import {
  createGroup,
  getGroupDetails,
  getGroups,
  removeGroup,
  updateGroup,
} from "../requests/groups";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IGroupCreate } from "@/interfaces/group";

interface MutationQuery {
  onSuccess?: (data: IGroup) => void;
  onError?: () => void;
  id?: number;
}

export const useGroupMutation = ({ onSuccess, onError, id }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: IGroupCreate) =>
      id ? updateGroup(id, data) : createGroup(data),
    onSuccess,
    onError,
  });

  return {
    data,
    isPending,
    mutate,
  };
};

export const useGroupsQuery = (params?: { teacherId?: number }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getGroups({ teacherId: params?.teacherId }),
    queryKey: [QUERY_KEYS.GROUPS, params?.teacherId],
    refetchOnWindowFocus: false,
    staleTime: 35 * 1000,
  });

  return {
    data,
    isLoading,
  };
};

interface QueryParams {
  enabled?: boolean;
}

export const useGroupDetailsQuery = (id: number, { enabled }: QueryParams) => {
  const { data, isLoading, isSuccess } = useQuery<IGroup>({
    queryFn: () => getGroupDetails(id),
    queryKey: [QUERY_KEYS.GROUPS, id],
    enabled,
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
};

export const useGroupDeletion = (
  id: number,
  { onSuccess, onError }: MutationQuery
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeGroup(id),
    onError,
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};
