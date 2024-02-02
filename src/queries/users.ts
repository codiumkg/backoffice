import { QUERY_KEYS } from "@/constants/queryKeys";
import { IUser } from "@/interfaces/user";
import {
  createUser,
  deleteUser,
  getUserDetails,
  getUsers,
} from "@/requests/users";
import { useMutation, useQuery } from "@tanstack/react-query";

interface MutationQuery {
  onSuccess?: (data: IUser) => void;
  onError?: () => void;
}

export const useUserMutation = ({ onSuccess, onError }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess,
    onError,
  });

  return {
    data,
    mutate,
    isPending,
  };
};

export const useUserDeletion = ({ onSuccess, onError }: MutationQuery) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useUsersQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: getUsers,
    queryKey: [QUERY_KEYS.USERS],
  });

  return {
    data,
    isLoading,
  };
};

interface QueryParams {
  enabled?: boolean;
}

export const useUserDetailsQuery = (id: number, { enabled }: QueryParams) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserDetails(id),
    queryKey: [QUERY_KEYS.USERS, id],
    enabled,
  });

  return {
    data,
    isLoading,
  };
};
