import { QUERY_KEYS } from "@/constants/queryKeys";
import { ITopic, ITopicCreate } from "@/interfaces/topic";
import {
  createTopic,
  getTopicDetails,
  getTopics,
  removeTopic,
  updateTopic,
} from "@/requests/topics";
import { useMutation, useQuery } from "@tanstack/react-query";

interface QueryParams {
  params?: any;
  enabled?: boolean;
}

export const useTopicsQuery = ({ params, enabled }: QueryParams) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getTopics(params?.search || ""),
    queryKey: [QUERY_KEYS.TOPICS, params?.title],
    refetchOnWindowFocus: false,
    enabled,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useTopicDetailsQuery = (id: number, { enabled }: QueryParams) => {
  const { data, isLoading, isSuccess } = useQuery<ITopic>({
    queryFn: () => getTopicDetails(id),
    queryKey: [QUERY_KEYS.TOPICS, id],
    enabled,
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
};

interface MutationQuery {
  onSuccess?: (data: ITopic) => void;
  onError?: () => void;
  id?: number;
}

export const useTopicMutation = ({ onError, onSuccess, id }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ITopicCreate) =>
      id ? updateTopic(id, data) : createTopic(data),
    onSuccess,
    onError,
  });

  return {
    data,
    isPending,
    mutate,
  };
};

export const useTopicDeletion = (
  id: number,
  { onError, onSuccess }: MutationQuery
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeTopic(id),
    onError,
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};
