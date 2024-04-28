import { ITopicContent, ITopicContentCreate } from "@/interfaces/topicContent";
import {
  createTopicContent,
  updateTopicContent,
} from "@/requests/topicContent";
import { useMutation } from "@tanstack/react-query";

interface MutationQuery {
  onSuccess?: (data: ITopicContent) => void;
  onError?: () => void;
  id?: number;
}

export const useTopicContentMutation = ({
  onSuccess,
  onError,
  id,
}: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ITopicContentCreate) =>
      id ? updateTopicContent(id, data) : createTopicContent(data),
    onSuccess,
    onError,
  });

  return {
    data,
    mutate,
    isPending,
  };
};
