import CustomInput from "@/components/shared/CustomInput/CustomInput";
import CustomSelect from "@/components/shared/CustomSelect/CustomSelect";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { Role } from "@/interfaces/auth";
import { IOption } from "@/interfaces/common";
import { IGroupCreate } from "@/interfaces/group";
import {
  useGroupDeletion,
  useGroupDetailsQuery,
  useGroupMutation,
} from "@/queries/groups";
import { useSubjectsQuery } from "@/queries/subjects";
import { useUsersQuery } from "@/queries/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const groupValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Название должно быть не менее 3 символов")
    .max(32, "Название должно быть не более 32 символов")
    .required("Это поле обязательное"),
  subjectId: Yup.number().nullable().required(),
  teacherId: Yup.number().nullable().required(),
});

const initialValues = {
  title: "",
  subjectId: 0,
};

interface GroupForm {
  title: string;
  subjectId: number;
  teacherId: number;
}

function GroupDetails() {
  const { id } = useParams();

  // const [search, setSearch] = useState("");

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: existingGroup,
    isLoading,
    isSuccess,
  } = useGroupDetailsQuery(+id!, { enabled: !!id });

  const {
    data: subjects,
    isFetching,
    // refetch,
  } = useSubjectsQuery({
    // params: { search },
  });

  const { data: teachers } = useUsersQuery({ role: Role.TEACHER });

  const { mutate, isPending } = useGroupMutation({
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
    id: +id!,
  });

  const { mutate: deleteGroup, isPending: isDeleting } = useGroupDeletion(
    +id!,
    {
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
    }
  );

  const [activeValue, setActiveValue] = useState<IOption>({
    label: subjects?.[0]?.title,
    value: subjects?.[0]?.id.toString(),
  });

  const [activeTeacher, setActiveTeacher] = useState<IOption>({
    label: teachers?.[0]?.username,
    value: teachers?.[0]?.id.toString(),
  });

  const teacherOptions = useMemo(
    () =>
      teachers?.map((teacher) => ({
        label: teacher.username,
        value: teacher.id.toString(),
      })) || [],
    [teachers]
  );

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
    console.log(data);
    mutate(data);
  };

  useEffect(() => {
    if (existingGroup && id) {
      groupForm.reset({
        title: existingGroup.title,
        subjectId: existingGroup.subject.id,
        teacherId: existingGroup.teacher.id,
      });
      setActiveValue({
        label: existingGroup.subject.title,
        value: existingGroup.subject.id.toString(),
      });
      setActiveTeacher({
        label: existingGroup.teacher.username,
        value: existingGroup.teacher.id.toString(),
      });
    }
  }, [isSuccess, existingGroup, groupForm, id]);

  useEffect(() => {
    if (!existingGroup || !id) {
      setActiveValue({
        label: subjects?.[0]?.title,
        value: subjects?.[0]?.id.toString(),
      });

      setActiveTeacher({
        label: teachers?.[0]?.username,
        value: teachers?.[0]?.id.toString(),
      });

      if (subjects) {
        groupForm.setValue("subjectId", subjects[0]?.id);
      }

      if (teachers) {
        groupForm.setValue("teacherId", teachers[0]?.id);
      }
    }
  }, [subjects, groupForm, id, existingGroup, teachers]);

  return (
    <Resource
      title={existingGroup?.title || "Группа"}
      isExisting={!!id}
      isLoading={isLoading}
      isSaveDisabled={!isValid || !groupForm.formState.isDirty}
      isSaveButtonLoading={isPending}
      isDeleting={isDeleting}
      onDeleteClick={deleteGroup}
      onSaveClick={() => onSubmit(groupForm.getValues())}
    >
      <Controller
        control={groupForm.control}
        name="title"
        render={({ field }) => (
          <CustomInput
            label="Название"
            placeholder="Введите название..."
            errorMessage={groupForm.formState.errors.title?.message}
            onChangeCallback={(value) => {
              groupForm.setValue("title", value);
            }}
            {...field}
          />
        )}
      />

      <CustomSelect
        options={subjectOptions}
        activeValue={activeValue}
        onChange={(e) => {
          setActiveValue({
            label: subjectOptions.find(
              (option) => option.value === e.target.value
            )?.label,
            value: e.target.value,
          });
          groupForm.setValue("subjectId", +e.target.value, {
            shouldDirty: true,
          });
        }}
        label="Предмет"
        placeholder="Выберите предмет..."
        isLoading={isFetching}
      />

      <CustomSelect
        options={teacherOptions}
        activeValue={activeTeacher}
        onChange={(e) => {
          setActiveTeacher({
            label: teacherOptions?.find(
              (option) => option.value === e.target.value
            )?.label,
            value: e.target.value,
          });
          groupForm.setValue("teacherId", +e.target.value, {
            shouldDirty: true,
          });
        }}
        label="Преподаватель"
        placeholder="Выберите преподавателя..."
      />
    </Resource>
  );
}

export default GroupDetails;
