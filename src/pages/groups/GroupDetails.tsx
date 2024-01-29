import Button from "@/components/shared/Button/Button";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { IGroupCreate } from "@/interfaces/group";
import { useGroupMutation } from "@/queries/groups";
import { useSubjectsQuery } from "@/queries/subjects";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const groupValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Название должно быть не менее 3 символов")
    .max(32, "Название должно быть не более 32 символов")
    .required("Это поле обязательное"),
  subjectId: Yup.number().nullable().required(),
});

const initialValues = {
  title: "",
  subjectId: 0,
};

interface GroupForm {
  title: string;
  subjectId: number;
}

function GroupDetails() {
  // const { id } = useParams();

  const [search, setSearch] = useState("");

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: subjects,
    isFetching,
    refetch,
  } = useSubjectsQuery({
    params: { search },
  });

  const { mutate: createGroup, isPending } = useGroupMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.GROUPS],
      });

      navigate(ROUTES.GROUPS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const [activeValue, setActiveValue] = useState<IOption>({
    label: subjects?.[0].title,
    value: subjects?.[0].id.toString(),
  });

  const subjectOptions = useMemo(
    () =>
      subjects?.map((subject) => ({
        label: subject.title,
        value: subject.id.toString(),
      })) || [],
    [subjects]
  );

  const groupForm = useForm<GroupForm>({
    defaultValues: initialValues,
    resolver: yupResolver<GroupForm>(groupValidationSchema),
    mode: "onBlur",
  });

  const isValid = Object.values(groupForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<GroupForm> = (data: IGroupCreate) => {
    createGroup(data);
  };

  useEffect(() => {
    setActiveValue({
      label: subjects?.[0].title,
      value: subjects?.[0].id.toString(),
    });

    if (subjects) {
      groupForm.setValue("subjectId", subjects[0].id);
    }
  }, [subjects, groupForm]);

  return (
    <Resource title="Группа">
      <form onSubmit={groupForm.handleSubmit(onSubmit)}>
        <CustomInput
          name="title"
          label="Название"
          placeholder="Введите название..."
          errorMessage={groupForm.formState.errors.title?.message}
          onChangeCallback={(value) => {
            groupForm.setValue("title", value);
          }}
        />
        <RelationInput
          name="subject"
          options={subjectOptions}
          activeValue={activeValue}
          setActiveValue={(value) => {
            groupForm.setValue("subjectId", +value.value);
            setActiveValue(value);
          }}
          label="Предмет"
          placeholder="Выберите предмет..."
          isLoading={isFetching}
          onSearch={(value) => {
            setSearch(value);
            refetch();
          }}
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

export default GroupDetails;
