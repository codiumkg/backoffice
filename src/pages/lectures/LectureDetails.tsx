import Button from "@/components/shared/Button/Button";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { ILectureCreate } from "@/interfaces/lecture";
import { useLectureMutation } from "@/queries/lectures";
import { useTopicsQuery } from "@/queries/topics";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const lectureValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Название должно быть не менее 3 символов")
    .max(32, "Название должно быть не более 32 символов")
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

  const { mutate: createLecture, isPending } = useLectureMutation({
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
  });

  const lectureForm = useForm<ILectureCreate>({
    defaultValues: initialValues,
    resolver: yupResolver<ILectureCreate>(lectureValidationSchema),
    mode: "onBlur",
  });

  const isValid = Object.values(lectureForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<ILectureCreate> = (data: ILectureCreate) => {
    createLecture(data);
  };

  useEffect(() => {
    setActiveValue({
      label: topics?.[0].title,
      value: topics?.[0].id.toString(),
    });

    if (topics) {
      lectureForm.setValue("topicId", topics[0].id);
    }
  }, [topics, lectureForm]);

  return (
    <Resource title="Лекция">
      <form onSubmit={lectureForm.handleSubmit(onSubmit)}>
        <CustomInput
          name="title"
          label="Название"
          placeholder="Введите название"
          errorMessage={lectureForm.formState.errors.title?.message}
          onChangeCallback={(value) => lectureForm.setValue("title", value)}
        />

        <CustomInput
          name="number"
          label="Номер лекции"
          placeholder="Введите номер лекции..."
          type="number"
          errorMessage={lectureForm.formState.errors.number?.message}
          onChangeCallback={(value) => lectureForm.setValue("number", +value)}
        />

        <RelationInput
          name="topic"
          options={topicOptions}
          activeValue={activeValue}
          setActiveValue={(value) => {
            lectureForm.setValue("topicId", +value.value);
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

export default LectureDetails;
