import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ISectionCreate } from "@/interfaces/section";
import {
  useSectionDeletion,
  useSectionDetailsQuery,
  useSectionMutation,
} from "@/queries/sections";
import { useSubjectsQuery } from "@/queries/subjects";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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

  const { id } = useParams();

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

  const {
    data: existingSection,
    isPending: isSectionLoading,
    isSuccess,
  } = useSectionDetailsQuery(+id!, { enabled: !!id });

  const { mutate: deleteSection, isPending: isDeleting } = useSectionDeletion(
    +id!,
    {
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
    }
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
    id: +id!,
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
    if (existingSection && id) {
      sectionForm.reset({
        title: existingSection.title,
        subjectId: existingSection.subject.id,
      });

      setActiveValue({
        label: existingSection.subject.title,
        value: existingSection.subject.id.toString(),
      });
    }
  }, [existingSection, id, sectionForm, isSuccess]);

  useEffect(() => {
    if (!existingSection || !id) {
      setActiveValue({
        label: subjects?.[0].title,
        value: subjects?.[0].id.toString(),
      });
    }

    if (subjects) {
      sectionForm.setValue("subjectId", subjects[0].id);
    }
  }, [subjects, sectionForm, existingSection, id]);

  return (
    <Resource
      title="Раздел"
      isExisting={!!id}
      isDeleting={isDeleting}
      isLoading={isSectionLoading}
      isSaveButtonLoading={isPending}
      isSaveDisabled={!isValid || !sectionForm.formState.isDirty}
      onDeleteClick={deleteSection}
      onSaveClick={() => onSubmit(sectionForm.getValues())}
    >
      <CustomInput
        {...sectionForm.register("title")}
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
    </Resource>
  );
}

export default SectionDetails;
