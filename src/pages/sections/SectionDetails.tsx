import Button from "@/components/shared/Button/Button";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ISectionCreate } from "@/interfaces/section";
import { useSectionMutation } from "@/queries/sections";
import { useSubjectsQuery } from "@/queries/subjects";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SectionForm {
  title: string;
  subjectId: number;
}

const initialValues: SectionForm = {
  title: "",
  subjectId: -1,
};

function SectionDetails() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const {
    data: subjects,
    isFetching,
    refetch,
  } = useSubjectsQuery({
    params: { search },
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

  const { mutate: createSection, isPending } = useSectionMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.SECTIONS],
      });

      navigate(ROUTES.SECTIONS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const sectionForm = useForm<SectionForm>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const isValid = Object.values(sectionForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<SectionForm> = (data: ISectionCreate) => {
    createSection(data);
  };

  useEffect(() => {
    setActiveValue({
      label: subjects?.[0].title,
      value: subjects?.[0].id.toString(),
    });

    if (subjects) {
      sectionForm.setValue("subjectId", subjects[0].id);
    }
  }, [subjects, sectionForm]);

  return (
    <Resource title="Раздел">
      <form onSubmit={sectionForm.handleSubmit(onSubmit)}>
        <CustomInput
          name="title"
          label="Название"
          placeholder="Введите название"
          onChangeCallback={(value) => sectionForm.setValue("title", value)}
        />

        <RelationInput
          name="subject"
          options={subjectOptions}
          activeValue={activeValue}
          setActiveValue={(value) => {
            sectionForm.setValue("subjectId", +value.value);
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

export default SectionDetails;
