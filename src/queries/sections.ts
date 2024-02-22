import { QUERY_KEYS } from "@/constants/queryKeys";
import { ISection, ISectionCreate } from "@/interfaces/section";
import {
  createSection,
  getSectionDetails,
  getSections,
  removeSection,
  updateSection,
} from "@/requests/sections";
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

export const useSectionDetailsQuery = (
  id: number,
  { enabled }: QueryParams
) => {
  const { data, isPending, isSuccess } = useQuery({
    queryFn: () => getSectionDetails(id),
    queryKey: [QUERY_KEYS.SECTIONS, id],
    enabled,
  });

  return {
    data,
    isPending,
    isSuccess,
  };
};

interface MutationQuery {
  onSuccess?: (data: ISection) => void;
  onError?: () => void;
  id?: number;
}

export const useSectionMutation = ({
  onSuccess,
  onError,
  id,
}: MutationQuery) => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: ISectionCreate) =>
      id ? updateSection(id, data) : createSection(data),
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
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeSection(id),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};
