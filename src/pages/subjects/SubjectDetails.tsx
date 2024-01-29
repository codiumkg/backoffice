import Button from "@/components/shared/Button/Button";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { ISubjectCreate } from "@/interfaces/subject";
import { useSubjectMutation } from "@/queries/subjects";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
};

interface SubjectForm {
  title: string;
  image?: string;
}

function SubjectDetails() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { showErrorNotification, showSuccessNotification } = useNotification();

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
  });

  const subjectForm = useForm<SubjectForm>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const isValid = Object.values(subjectForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<SubjectForm> = (data: ISubjectCreate) => {
    createSubject(data);
  };

  return (
    <Resource title="Предмет">
      <form onSubmit={subjectForm.handleSubmit(onSubmit)}>
        <CustomInput
          name="title"
          label="Название"
          placeholder="Введите название"
          onChangeCallback={(value) => subjectForm.setValue("title", value)}
        />

        <Button
          type="submit"
          text="Создать"
          disabled={!isValid}
          isLoading={isPending}
        />
      </form>
    </Resource>
  );
}

export default SubjectDetails;
