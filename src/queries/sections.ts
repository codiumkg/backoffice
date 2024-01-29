import { QUERY_KEYS } from "@/constants/queryKeys";
import { ISection } from "@/interfaces/section";
import { createSection, getSections, removeSection } from "@/requests/sections";
import { useMutation, useQuery } from "@tanstack/react-query";

interface QueryParams {
  params?: any;
  enabled?: boolean;
}

export const useSectionsQuery = ({ params, enabled }: QueryParams) => {
  const { data, isPending, refetch } = useQuery({
    queryFn: () => getSections(params?.search || ""),
    queryKey: [QUERY_KEYS.SECTIONS, params?.title],
    refetchOnWindowFocus: false,
    enabled,
  });

  return {
    data,
    isPending,
    refetch,
  };
};

interface MutationQuery {
  onSuccess?: (data: ISection) => void;
  onError?: () => void;
}

export const useSectionMutation = ({ onSuccess, onError }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: createSection,
    onSuccess,
    onError,
  });

  return {
    data,
    isPending,
    mutate,
  };
};

export const useSectionDeletion = (
  id: number,
  { onSuccess, onError }: MutationQuery
) => {
  const { isPending } = useMutation({
    mutationFn: () => removeSection(id),
    onSuccess,
    onError,
  });

  return {
    isPending,
  };
};
