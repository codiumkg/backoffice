import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ITopicCreate } from "@/interfaces/topic";
import { useSectionsQuery } from "@/queries/sections";
import {
  useTopicDeletion,
  useTopicDetailsQuery,
  useTopicMutation,
} from "@/queries/topics";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface TopicForm {
  title: string;
  sectionId: number;
}

const initialValues: TopicForm = {
  title: "",
  sectionId: -1,
};

function TopicDetails() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const {
    data: existingTopic,
    isLoading,
    isSuccess,
  } = useTopicDetailsQuery(+id!, { enabled: !!id });

  const {
    data: sections,
    isPending: isSectionsLoading,
    refetch,
  } = useSectionsQuery({ params: { search } });

  const [activeValue, setActiveValue] = useState<IOption>({
    label: sections?.[0].title,
    value: sections?.[0].id.toString(),
  });

  const sectionOptions = useMemo(
    () =>
      sections?.map((section) => ({
        label: section.title,
        value: section.id.toString(),
      })) || [],
    [sections]
  );

  const { mutate, isPending } = useTopicMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.TOPICS],
      });

      navigate(ROUTES.TOPICS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
    id: +id!,
  });

  const { mutate: deleteTopic, isPending: isDeleting } = useTopicDeletion(
    +id!,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: [QUERY_KEYS.TOPICS],
        });

        navigate(ROUTES.TOPICS);

        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    }
  );

  const topicForm = useForm<TopicForm>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const isValid = Object.values(topicForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<TopicForm> = (data: ITopicCreate) => {
    mutate(data);
  };

  useEffect(() => {
    if (existingTopic && id) {
      topicForm.reset({
        title: existingTopic.title,
        sectionId: existingTopic.sectionId,
      });
      setActiveValue({
        label: existingTopic.section.title,
        value: existingTopic.section.id.toString(),
      });
    }
  }, [isSuccess, existingTopic, topicForm, id]);

  useEffect(() => {
    if (!existingTopic || !id) {
      setActiveValue({
        label: sections?.[0].title,
        value: sections?.[0].id.toString(),
      });
    }

    if (sections) {
      topicForm.setValue("sectionId", sections[0].id);
    }
  }, [sections, topicForm, existingTopic, id]);

  return (
    <Resource
      title="Топик"
      isExisting={!!id}
      isSaveDisabled={!isValid || !topicForm.formState.isDirty}
      isSaveButtonLoading={isPending}
      onDeleteClick={deleteTopic}
      isDeleting={isDeleting}
      onSaveClick={() => onSubmit(topicForm.getValues())}
    >
      <CustomInput
        {...topicForm.register("title")}
        label="Название"
        placeholder="Введите название"
        onChangeCallback={(value) => topicForm.setValue("title", value)}
      />

      <RelationInput
        name="section"
        options={sectionOptions}
        activeValue={activeValue}
        setActiveValue={(value) => {
          topicForm.setValue("sectionId", +value.value);
          setActiveValue(value);
        }}
        label="Раздел"
        placeholder="Выберите раздел..."
        isLoading={isSectionsLoading}
        onSearch={(value) => {
          setSearch(value);
          refetch();
        }}
      />
    </Resource>
  );
}

export default TopicDetails;
