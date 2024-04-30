import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import TextEditor from "@/components/shared/TextEditor/TextEditor";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ILectureCreate } from "@/interfaces/lecture";
import {
  useLectureDeletion,
  useLectureDetailsQuery,
  useLectureMutation,
} from "@/queries/lectures";
import { useTopicsQuery } from "@/queries/topics";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const lectureValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Название должно быть не менее 3 символов")
    .max(90, "Название должно быть не более 90 символов")
    .required("Это поле обязательное"),
  content: Yup.string()
    .min(3, "Это поле должно быть не менее 50 символов")
    .required("Это поле обязательное"),
  number: Yup.number().required("Это поле обязательно"),
  image: Yup.string().notRequired(),
  topicId: Yup.number().nullable().required(),
});

const initialValues: ILectureCreate = {
  title: "",
  content: "",
  number: 0,
  image: null,
  topicId: -1,
};

function LectureDetails() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const {
    data: topics,
    isLoading: isTopicsLoading,
    refetch,
  } = useTopicsQuery({
    params: { search },
  });

  const [activeValue, setActiveValue] = useState<IOption>({
    label: topics?.[0].title,
    value: topics?.[0].id.toString(),
  });

  const topicOptions = useMemo(
    () =>
      topics?.map((subject) => ({
        label: subject.title,
        value: subject.id.toString(),
      })) || [],
    [topics]
  );

  const {
    data: existingLecture,
    isLoading,
    isSuccess,
  } = useLectureDetailsQuery(+id!, { enabled: !!id });

  const { mutate, isPending } = useLectureMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.LECTURES],
      });

      navigate(ROUTES.LECTURES);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
    id: +id!,
  });

  const { mutate: deleteLecture, isPending: isDeleting } = useLectureDeletion(
    +id!,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: [QUERY_KEYS.LECTURES],
        });

        navigate(ROUTES.LECTURES);

        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    }
  );

  const lectureForm = useForm<ILectureCreate>({
    defaultValues: initialValues,
    resolver: yupResolver<ILectureCreate>(lectureValidationSchema),
    mode: "onBlur",
  });

  const isValid = Object.values(lectureForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<ILectureCreate> = (data: ILectureCreate) => {
    mutate({ ...data, number: +data.number });
  };

  useEffect(() => {
    if (existingLecture && !!id) {
      lectureForm.reset({
        title: existingLecture.title,
        topicId: existingLecture.topicId,
        content: existingLecture.content,
        number: existingLecture.number,
      });

      setActiveValue({
        label: existingLecture.topic.title,
        value: existingLecture.topic.id.toString(),
      });
    }
  }, [id, existingLecture, isSuccess, lectureForm]);

  useEffect(() => {
    if (!existingLecture || !id) {
      setActiveValue({
        label: topics?.[0].title,
        value: topics?.[0].id.toString(),
      });
    }

    if (topics) {
      lectureForm.setValue("topicId", topics[0].id);
    }
  }, [topics, lectureForm, existingLecture, id]);

  return (
    <Resource
      title="Лекция"
      isExisting={!!id}
      isLoading={isLoading}
      onDeleteClick={deleteLecture}
      isDeleting={isDeleting}
      isSaveDisabled={!isValid || !lectureForm.formState.isDirty}
      isSaveButtonLoading={isPending}
      onSaveClick={() => onSubmit(lectureForm.getValues())}
    >
      <Controller
        name="title"
        control={lectureForm.control}
        render={({ field }) => (
          <CustomInput
            label="Название"
            placeholder="Введите название..."
            errorMessage={lectureForm.formState.errors.title?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="title"
        control={lectureForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Номер лекции"
            placeholder="Введите номер лекции..."
            type="number"
            value={lectureForm.watch("number").toString()}
            errorMessage={lectureForm.formState.errors.number?.message}
          />
        )}
      />

      <Controller
        name="content"
        control={lectureForm.control}
        render={({ field }) => (
          <TextEditor
            label="Содержимое"
            {...field}
            placeholder="Введите содержимое лекции..."
          />
        )}
      />

      <RelationInput
        name="topic"
        options={topicOptions}
        activeValue={activeValue}
        setActiveValue={(value) => {
          lectureForm.setValue("topicId", +value.value, { shouldDirty: true });
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

export default LectureDetails;
