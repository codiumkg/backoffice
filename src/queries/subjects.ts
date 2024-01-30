import { QUERY_KEYS } from "../constants/queryKeys";
import { ISubject, ISubjectCreate } from "../interfaces/subject";
import {
  createSubject,
  getSubjectDetails,
  getSubjects,
  removeSubject,
  updateSubject,
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

export const useSubjectDetailsQuery = (
  id: number,
  { enabled }: QueryParams
) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getSubjectDetails(id),
    queryKey: [QUERY_KEYS.SUBJECTS, id],
    enabled,
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
};

interface MutationQuery {
  onSuccess?: (data: ISubject) => void;
  onError?: () => void;
  id?: number;
}

export const useSubjectMutation = ({
  onSuccess,
  onError,
  id,
}: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ISubjectCreate) =>
      id ? updateSubject(id, data) : createSubject(data),
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
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeSubject(id),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};
