import { QUERY_KEYS } from "@/constants/queryKeys";
import { ITopic } from "@/interfaces/topic";
import { createTopic, getTopics } from "@/requests/topics";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTopicsQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: getTopics,
    queryKey: [QUERY_KEYS.TOPICS],
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
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
