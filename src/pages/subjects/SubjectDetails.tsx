import CustomInput from "@/components/shared/CustomInput/CustomInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { ISubjectCreate } from "@/interfaces/subject";
import {
  useSubjectDeletion,
  useSubjectDetailsQuery,
  useSubjectMutation,
} from "@/queries/subjects";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  title: "",
};

interface SubjectForm {
  title: string;
  image?: string;
}

function SubjectDetails() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const {
    data: existingSubject,
    isLoading,
    isSuccess,
  } = useSubjectDetailsQuery(+id!, {
    enabled: !!id,
  });

  const { mutate: deleteSubject, isPending: isDeleting } = useSubjectDeletion(
    +id!,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: [QUERY_KEYS.SUBJECTS],
        });

        navigate(ROUTES.SUBJECTS);

        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    }
  );

  const { mutate: createSubject, isPending } = useSubjectMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.SUBJECTS],
      });

      navigate(ROUTES.SUBJECTS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
    id: +id!,
  });

  const subjectForm = useForm<SubjectForm>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const isValid = Object.values(subjectForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<SubjectForm> = (data: ISubjectCreate) => {
    createSubject(data);
  };

  useEffect(() => {
    if (existingSubject && id) {
      subjectForm.reset({
        title: existingSubject.title,
      });
    }
  }, [id, subjectForm, existingSubject, isSuccess]);

  return (
    <Resource
      title="Предмет"
      onDeleteClick={deleteSubject}
      isDeleting={isDeleting}
      isExisting={!!id}
      isLoading={isLoading}
      isSaveButtonLoading={isPending}
      onSaveClick={() => onSubmit(subjectForm.getValues())}
      isSaveDisabled={!isValid || !subjectForm.formState.isDirty}
    >
      <CustomInput
        {...subjectForm.register("title")}
        label="Название"
        placeholder="Введите название"
        onChangeCallback={(value) => subjectForm.setValue("title", value)}
      />
    </Resource>
  );
}

export default SubjectDetails;
