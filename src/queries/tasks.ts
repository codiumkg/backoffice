import { QUERY_KEYS } from "@/constants/queryKeys";
import { ITask, ITaskCreate } from "@/interfaces/task";
import {
  createTask,
  getTaskDetails,
  getTasks,
  removeTask,
  updateTask,
} from "@/requests/tasks";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTasksQuery = () => {
  const { data, isPending } = useQuery({
    queryFn: getTasks,
    queryKey: [QUERY_KEYS.TASKS],
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
}

export const useTaskMutation = (params?: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ITaskCreate, id?: number) =>
      id ? updateTask(id, data) : createTask(data),
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
