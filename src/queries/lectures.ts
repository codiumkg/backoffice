import { QUERY_KEYS } from "@/constants/queryKeys";
import { ILecture } from "@/interfaces/lecture";
import {
  createLecture,
  getLectureDetails,
  getLectures,
  removeLecture,
} from "@/requests/lectures";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLecturesQuery = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getLectures(),
    queryKey: [QUERY_KEYS.LECTURES],
    refetchOnWindowFocus: false,
    staleTime: 30 * 1000,
  });

  return {
    data,
    isLoading,
  };
};

interface QueryParams {
  enabled?: boolean;
}

export const useLectureDetailsQuery = (
  id: number,
  { enabled }: QueryParams
) => {
  const { data, isLoading, isSuccess } = useQuery<ILecture>({
    queryFn: () => getLectureDetails(id),
    queryKey: [QUERY_KEYS.LECTURES, id],
    enabled,
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
};

interface MutationQuery {
  onSuccess?: (data: ILecture) => void;
  onError?: () => void;
}

export const useLectureMutation = ({ onSuccess, onError }: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: createLecture,
    onError,
    onSuccess,
  });

  return {
    data,
    mutate,
    isPending,
  };
};

export const useLectureDeletion = (
  id: number,
  { onSuccess, onError }: MutationQuery
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeLecture(id),
    onError,
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};
