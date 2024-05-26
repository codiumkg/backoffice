import { API_STUDENT_PROGRESS } from "@/constants/apiConstants";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Role } from "@/interfaces/auth";
import { ICreateUser, IUser, IUserFilters } from "@/interfaces/user";
import {
  createUser,
  deleteUser,
  getUserDetails,
  getUserProgress,
  getUsers,
  resetPassword,
  updateUser,
} from "@/requests/users";
import { useMutation, useQuery } from "@tanstack/react-query";

interface MutationQuery {
  onSuccess?: (data: IUser) => void;
  onError?: () => void;
  id?: number;
}

export const useUserMutation = ({ onSuccess, onError, id }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ICreateUser) =>
      id ? updateUser(id, data) : createUser(data),
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

export const useUsersQuery = (filters?: IUserFilters) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUsers(filters),
    queryKey: [
      QUERY_KEYS.USERS,
      filters?.role,
      filters?.groupId,
      filters?.search,
    ],
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

export const usePasswordReset = (params?: MutationQuery) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (userId: number) => resetPassword(userId),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useUserProgress = (id: number) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserProgress(id),
    queryKey: [API_STUDENT_PROGRESS, id],
  });

  return {
    userProgress: data,
    isUserProgressLoading: isLoading,
  };
};
