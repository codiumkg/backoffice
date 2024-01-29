import { QUERY_KEYS } from "../constants/queryKeys";
import { ISubject } from "../interfaces/subject";
import {
  createSubject,
  getSubjects,
  removeSubject,
} from "../requests/subjects";
import { useMutation, useQuery } from "@tanstack/react-query";

interface QueryParams {
  params?: any;
  enabled?: boolean;
}

export const useSubjectsQuery = ({ params, enabled }: QueryParams) => {
  const { data, isFetching, isSuccess, isError, refetch } = useQuery<
    ISubject[]
  >({
    queryKey: [QUERY_KEYS.SUBJECTS, params?.search],
    queryFn: () => getSubjects(params?.search || ""),
    refetchOnWindowFocus: false,
    enabled,
  });

  return {
    data,
    isFetching,
    isSuccess,
    isError,
    refetch,
  };
};

interface MutationQuery {
  onSuccess?: (data: ISubject) => void;
  onError?: () => void;
}

export const useSubjectMutation = ({ onSuccess, onError }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: createSubject,
    onSuccess,
    onError,
  });

  return {
    data,
    isPending,
    mutate,
  };
};

export const useSubjectDeletion = (
  id: number,
  { onSuccess, onError }: MutationQuery
) => {
  const { isPending } = useMutation({
    mutationFn: () => removeSubject(id),
    onSuccess,
    onError,
  });

  return {
    isPending,
  };
};
