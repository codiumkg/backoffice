import { Button, Checkbox } from "@nextui-org/react";
import CustomCheckbox from "@/components/shared/Checkbox/Checkbox";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
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

import CustomSelect from "@/components/shared/CustomSelect/CustomSelect";

const initialValues: ITaskCreate = {
  text: "",
  tip: "",
  topicId: -1,
  answers: [],
  correctAnswerExplanation: "",
  isUserAnswer: false,
};

function TaskDetails() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

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

  const { data: topics, isLoading: isTopicsLoading } = useTopicsQuery({});

  const [activeValue, setActiveValue] = useState<IOption>({
    label: topics?.[0]?.title,
    value: topics?.[0]?.id.toString(),
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
    mutate({ ...data, answers: data.isUserAnswer ? [] : data.answers });
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
        isUserAnswer: existingTask.isUserAnswer,
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
        label: topics?.[0]?.title,
        value: topics?.[0]?.id.toString(),
      });
    }

    if (topics) {
      taskForm.setValue("topicId", topics[0]?.id);
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

      <Controller
        name="tip"
        control={taskForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Подсказка"
            placeholder="Введите подсказку..."
            errorMessage={taskForm.formState.errors.tip?.message}
          />
        )}
      />

      <CustomSelect
        label="Топик"
        placeholder="Выберите топик"
        options={topicOptions}
        activeValue={activeValue}
        isLoading={isTopicsLoading}
        onChange={(e) => {
          setActiveValue({
            label: topicOptions.find(
              (option) => option.value === e.target.value
            )?.label,
            value: e.target.value,
          });

          taskForm.setValue("topicId", +e.target.value, { shouldDirty: true });
        }}
      />

      <Controller
        control={taskForm.control}
        name="correctAnswerExplanation"
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Объяснение правильного ответа"
            placeholder="Введите объяснение правильного ответа..."
          />
        )}
      />

      <Checkbox
        isSelected={taskForm.watch("isUserAnswer")}
        onValueChange={(value) =>
          taskForm.setValue("isUserAnswer", value, { shouldDirty: true })
        }
      >
        Задача с открытым вопросом (ответ от студента)
      </Checkbox>

      {!taskForm.watch("isUserAnswer") && (
        <div className="flex flex-col gap-2">
          {!!answers.length && (
            <div>
              <h3 className="mb-3">Варианты ответов</h3>

              <div className="grid grid-cols-2 place-content-center gap-4 mb-4">
                {answers.map((answer, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex items-center gap-3">
                      <CustomInput
                        label={`Ответ ${index + 1}`}
                        placeholder="Введите вариант ответа..."
                        name="answers"
                        value={answer.text}
                        onChange={(e) => {
                          setAnswers((prevAnswers) =>
                            prevAnswers.map((answer, prevAnswerIndex) =>
                              prevAnswerIndex === index
                                ? { ...answer, text: e.target.value }
                                : answer
                            )
                          );
                        }}
                      />

                      {/* <CustomCheckbox
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
                      /> */}

                      <Checkbox
                        aria-label="Правильный ответ"
                        color="primary"
                        isSelected={answer.isCorrectAnswer}
                        onValueChange={() => {
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
                      >
                        Правильный ответ
                      </Checkbox>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <CustomInput
              label="Ответ"
              placeholder="Введите вариант ответа..."
              name="answers"
              value={answer.text}
              onChange={(e) => setAnswer({ ...answer, text: e.target.value })}
            />
            <Checkbox
              isSelected={answer.isCorrectAnswer}
              onValueChange={handleNewAnswerToggle}
            >
              Правильный ответ
            </Checkbox>
            {/* <CustomCheckbox
              label="Правильный ответ"
              value={answer.isCorrectAnswer}
              onClick={handleNewAnswerToggle}
            /> */}
          </div>
          <div className="mt-8">
            <Button
              color="primary"
              onClick={handleAddAnswer}
              isDisabled={answer.text.trim().length === 0}
            >
              Добавить вариант ответа
            </Button>
          </div>
        </div>
      )}
    </Resource>
  );
}

export default TaskDetails;
