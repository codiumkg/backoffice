import { QUERY_KEYS } from "@/constants/queryKeys";
import { ITopic } from "@/interfaces/topic";
import { createTopic, getTopics, removeTopic } from "@/requests/topics";
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

interface MutationQuery {
  onSuccess?: (data: ITopic) => void;
  onError?: () => void;
}

export const useTopicMutation = ({ onError, onSuccess }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: createTopic,
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
  const { isPending } = useMutation({
    mutationFn: () => removeTopic(id),
    onError,
    onSuccess,
  });

  return {
    isPending,
  };
};
