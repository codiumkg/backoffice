import { QUERY_KEYS } from "@/constants/queryKeys";
import { ITask, ITaskCreate, ITaskFilters } from "@/interfaces/task";
import {
  createTask,
  getTaskDetails,
  getTasks,
  getUserTaskAnswers,
  removeTask,
  updateTask,
} from "@/requests/tasks";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTasksQuery = (filters?: ITaskFilters) => {
  const { data, isPending } = useQuery({
    queryFn: () => getTasks(filters),
    queryKey: [QUERY_KEYS.TASKS, filters?.search, filters?.topicId],
  });

  return {
    data,
    isPending,
  };
};

interface QueryParams {
  enabled?: boolean;
}

export const useTaskDetails = (id: number, { enabled }: QueryParams) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getTaskDetails(id),
    queryKey: [QUERY_KEYS.TASKS, id],
    enabled,
  });

  return {
    data,
    isLoading,
  };
};

interface MutationQuery {
  onSuccess?: (data: ITask) => void;
  onError?: () => void;
  id?: number;
}

export const useTaskMutation = (params?: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ITaskCreate) =>
      params?.id ? updateTask(params.id, data) : createTask(data),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    data,
    mutate,
    isPending,
  };
};

export const useTaskDeletion = (params?: MutationQuery) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => removeTask(id),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useTaskUserAnswers = (userId?: number, enabled?: boolean) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserTaskAnswers(userId!),
    queryKey: [QUERY_KEYS.TASK_USER_ANSWERS, userId],
    enabled,
  });

  return {
    userAnswers: data,
    isUserAnswersLoading: isLoading,
  };
};
