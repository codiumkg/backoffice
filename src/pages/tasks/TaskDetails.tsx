import Button from "@/components/shared/Button/Button";
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import TextEditor from "@/components/shared/TextEditor/TextEditor";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { ICreateAnswer } from "@/interfaces/answer";
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

import styles from "./TaskDetails.module.scss";

const initialValues: ITaskCreate = {
  text: "",
  tip: "",
  topicId: -1,
  answers: [],
};

function TaskDetails() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [answer, setAnswer] = useState<ICreateAnswer>({
    text: "",
    isCorrectAnswer: false,
  });

  const { showSuccessNotification, showErrorNotification, showNotification } =
    useNotification();

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
    id: +id!,
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

  const [answers, setAnswers] = useState<ICreateAnswer[]>(
    taskForm.watch("answers")
  );

  const isValid = Object.values(taskForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<ITaskCreate> = (data: ITaskCreate) => {
    mutate(data);
  };

  const handleNewAnswerToggle = () => {
    if (answers.some((answer) => answer.isCorrectAnswer)) {
      showNotification("Допустим только один правильный вариант ответа");
      return;
    }

    setAnswer({ ...answer, isCorrectAnswer: !answer.isCorrectAnswer });
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { ...answer, text: answer.text.trim() }]);
    setAnswer({ text: "", isCorrectAnswer: false });
  };

  useEffect(() => {
    if (existingTask && id) {
      taskForm.reset({
        text: existingTask.text,
        topicId: existingTask.topicId,
        answers: existingTask.answers,
        tip: existingTask.tip,
        image: existingTask.image,
      });
      setActiveValue({
        label: existingTask.topic.title,
        value: existingTask.topic.id.toString(),
      });

      setAnswers(taskForm.getValues("answers"));
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

  useEffect(() => {
    taskForm.setValue("answers", answers, { shouldDirty: true });
  }, [answers, taskForm]);

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

      <h3>Варианты ответов</h3>

      <div className={styles["answers-wrapper"]}>
        {answers.map((answer, index) => (
          <div className={styles["answer"]} key={index}>
            <div className={styles["answer-inputs"]}>
              <CustomInput
                label={`Ответ ${index + 1}`}
                placeholder="Введите вариант ответа..."
                name="answers"
                value={answer.text}
                onChangeCallback={(value) => {
                  setAnswers((prevAnswers) =>
                    prevAnswers.map((answer, prevAnswerIndex) =>
                      prevAnswerIndex === index
                        ? { ...answer, text: value }
                        : answer
                    )
                  );
                }}
              />

              <Checkbox
                label="Правильный ответ"
                value={answer.isCorrectAnswer}
                onClick={() => {
                  setAnswers((prevAnswers) =>
                    prevAnswers.map((answer, prevAnswerIndex) =>
                      prevAnswerIndex === index
                        ? {
                            ...answer,
                            isCorrectAnswer: !answer.isCorrectAnswer,
                          }
                        : { ...answer, isCorrectAnswer: false }
                    )
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles["input-container"]}>
        <CustomInput
          label="Ответ"
          placeholder="Введите вариант ответа..."
          name="answers"
          value={answer.text}
          onChangeCallback={(value) => setAnswer({ ...answer, text: value })}
        />
        <Checkbox
          label="Правильный ответ"
          value={answer.isCorrectAnswer}
          onClick={handleNewAnswerToggle}
        />
      </div>
      <div className={styles["button-container"]}>
        <Button
          text="Добавить вариант ответа"
          onClick={handleAddAnswer}
          disabled={answer.text.trim().length === 0}
        />
      </div>
    </Resource>
  );
}

export default TaskDetails;
