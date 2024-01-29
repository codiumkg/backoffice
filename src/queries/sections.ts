import { QUERY_KEYS } from "@/constants/queryKeys";
import { ISection } from "@/interfaces/section";
import { createSection, getSections } from "@/requests/sections";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSectionsQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSections,
    queryKey: [QUERY_KEYS.SECTIONS],
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
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
