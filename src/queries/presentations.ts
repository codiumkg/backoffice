import { QUERY_KEYS } from "@/constants/queryKeys";
import {
  IPresentationCreate,
  IPresentationFilters,
} from "@/interfaces/presentation";
import {
  createPresentation,
  deletePresentation,
  getPresentations,
  getPresentationDetails,
  updatePresentation,
} from "@/requests/presentations";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePresentations = (filters?: IPresentationFilters) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PRESENTATIONS, filters?.topicId],
    queryFn: () => getPresentations(filters),
  });

  return {
    presentations: data,
    isPresentationsLoading: isLoading,
  };
};

export const usePresentationDetails = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PRESENTATIONS, id],
    queryFn: () => getPresentationDetails(id),
  });

  return {
    presentation: data,
    isPresentationLoading: isLoading,
  };
};

export const usePresentationMutation = (params?: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id?: number; data: IPresentationCreate }) =>
      id ? updatePresentation(id, data) : createPresentation(data),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    mutatePresentation: mutate,
    isMutatingPresentation: isPending,
  };
};

export const usePresentationDeletion = (params?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deletePresentation(id),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    deletePresentation: mutate,
    isDeletingPresentation: isPending,
  };
};
