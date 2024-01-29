import Button from "@/components/shared/Button/Button";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ITopicCreate } from "@/interfaces/topic";
import { useSectionsQuery } from "@/queries/sections";
import { useTopicMutation } from "@/queries/topics";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { showSuccessNotification, showErrorNotification } = useNotification();

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

  const { mutate: createTopic, isPending } = useTopicMutation({
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
  });

  const topicForm = useForm<TopicForm>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const isValid = Object.values(topicForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<TopicForm> = (data: ITopicCreate) => {
    createTopic(data);
  };

  useEffect(() => {
    setActiveValue({
      label: sections?.[0].title,
      value: sections?.[0].id.toString(),
    });

    if (sections) {
      topicForm.setValue("sectionId", sections[0].id);
    }
  }, [sections, topicForm]);

  return (
    <Resource title="Топик">
      <form onSubmit={topicForm.handleSubmit(onSubmit)}>
        <CustomInput
          name="title"
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

export default TopicDetails;
