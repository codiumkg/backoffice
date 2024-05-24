import { QUERY_KEYS } from "@/constants/queryKeys";
import { IMethodologyCreate } from "@/interfaces/methodology";
import {
  createMethodology,
  deleteMethodology,
  getMethodologies,
  getMethodologyDetails,
  updateMethodology,
} from "@/requests/methodologies";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMethodologies = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.METHODOLOGIES],
    queryFn: getMethodologies,
  });

  return {
    methodologies: data,
    isMethodologiesLoading: isLoading,
  };
};

export const useMethodologyDetails = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.METHODOLOGIES, id],
    queryFn: () => getMethodologyDetails(id),
  });

  return {
    methodology: data,
    isMethodologyLoading: isLoading,
  };
};

export const useMethodologyMutation = (params?: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id?: number; data: IMethodologyCreate }) =>
      id ? updateMethodology(id, data) : createMethodology(data),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    mutateMethodology: mutate,
    isMutatingMethodology: isPending,
  };
};

export const useMethodologyDeletion = (params?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteMethodology(id),
    onSuccess: params?.onSuccess,
    onError: params?.onError,
  });

  return {
    deleteMethodology: mutate,
    isDeletingMethodology: isPending,
  };
};
