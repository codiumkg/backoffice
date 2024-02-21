import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import TextEditor from "@/components/shared/TextEditor/TextEditor";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ITaskCreate } from "@/interfaces/task";
import {
  useTaskDeletion,
  useTaskDetails,
  useTaskMutation,
} from "@/queries/tasks";
import { useTopicsQuery } from "@/queries/topics";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const initialValues: ITaskCreate = {
  text: "",
  tip: "",
  topicId: -1,
};

function TaskDetails() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { data: existingTask, isLoading: isTaskLoading } = useTaskDetails(
    +id!,
    { enabled: !!id }
  );

  const {
    data: topics,
    isLoading: isTopicsLoading,
    refetch,
  } = useTopicsQuery({ params: { search } });

  const [activeValue, setActiveValue] = useState<IOption>({
    label: topics?.[0].title,
    value: topics?.[0].id.toString(),
  });

  const topicOptions = useMemo(
    () =>
      topics?.map((topic) => ({
        label: topic.title,
        value: topic.id.toString(),
      })) || [],
    [topics]
  );

  const { mutate, isPending } = useTaskMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.TASKS],
      });

      navigate(ROUTES.TASKS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useTaskDeletion({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.TASKS],
      });

      navigate(ROUTES.TASKS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const taskForm = useForm<ITaskCreate>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const isValid = Object.values(taskForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<ITaskCreate> = (data: ITaskCreate) => {
    mutate(data);
  };

  useEffect(() => {
    if (existingTask && id) {
      taskForm.reset(existingTask);
      setActiveValue({
        label: existingTask.topic.title,
        value: existingTask.topic.id.toString(),
      });
    }
  }, [existingTask, taskForm, id]);

  useEffect(() => {
    if (!existingTask || !id) {
      setActiveValue({
        label: topics?.[0].title,
        value: topics?.[0].id.toString(),
      });
    }

    if (topics) {
      taskForm.setValue("topicId", topics[0].id);
    }
  }, [topics, taskForm, existingTask, id]);

  return (
    <Resource
      title="Задача"
      isExisting={!!id}
      isLoading={isTaskLoading}
      isSaveDisabled={!isValid || !taskForm.formState.isDirty}
      isSaveButtonLoading={isPending}
      onDeleteClick={() => deleteTask(+id!)}
      isDeleting={isDeleting}
      onSaveClick={() => onSubmit(taskForm.getValues())}
    >
      <Controller
        name="text"
        control={taskForm.control}
        render={({ field }) => (
          <TextEditor
            label="Содержимое"
            {...field}
            placeholder="Введите содержимое задачи..."
          />
        )}
      />

      <CustomInput
        {...taskForm.register("tip")}
        label="Подсказка"
        placeholder="Введите подсказку..."
        errorMessage={taskForm.formState.errors.tip?.message}
        onChangeCallback={(value) => taskForm.setValue("tip", value)}
      />

      <RelationInput
        name="topic"
        options={topicOptions}
        activeValue={activeValue}
        setActiveValue={(value) => {
          taskForm.setValue("topicId", +value.value);
          setActiveValue(value);
        }}
        label="Топик"
        placeholder="Выберите топик..."
        isLoading={isTopicsLoading}
        onSearch={(value) => {
          setSearch(value);
          refetch();
        }}
      />
    </Resource>
  );
}

export default TaskDetails;
