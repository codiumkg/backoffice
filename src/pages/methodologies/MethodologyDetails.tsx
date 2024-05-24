import CustomInput from "@/components/shared/CustomInput/CustomInput";
import CustomSelect from "@/components/shared/CustomSelect/CustomSelect";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { IMethodologyCreate } from "@/interfaces/methodology";
import {
  useMethodologyDeletion,
  useMethodologyDetails,
  useMethodologyMutation,
} from "@/queries/methodologies";
import { useTopicsQuery } from "@/queries/topics";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  filePath: Yup.string()
    .min(8, "")
    .matches(/^https:\/\/[^\s/$.?#].[^\s]*$/)
    .required("Это поле обязательное"),

  topicId: Yup.number().required("Это поле обязательное"),
});

export default function MethodologyDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { mutateMethodology, isMutatingMethodology } = useMethodologyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.METHODOLOGIES],
      });

      navigate(ROUTES.METHODOLOGIES);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const { deleteMethodology, isDeletingMethodology } = useMethodologyDeletion({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.METHODOLOGIES],
      });

      navigate(ROUTES.METHODOLOGIES);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const { methodology, isMethodologyLoading } = useMethodologyDetails(+id!);

  const { data: topics, isLoading: isTopicsLoading } = useTopicsQuery({});

  const [activeTopic, setActiveTopic] = useState<IOption>({
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

  const methodologyForm = useForm<IMethodologyCreate>({
    defaultValues: {
      filePath: "",
    },
    resolver: yupResolver<IMethodologyCreate>(validationSchema),
    mode: "onBlur",
  });

  const isValid = Object.values(methodologyForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<IMethodologyCreate> = (
    data: IMethodologyCreate
  ) => {
    mutateMethodology({ data, id: +id! });
  };

  useEffect(() => {
    if (methodology && !!id) {
      methodologyForm.reset({
        filePath: methodology.filePath,
        topicId: methodology.topic.id,
      });

      setActiveTopic({
        label: methodology.topic.title,
        value: methodology.topic.id.toString(),
      });
    }
  }, [methodology, id, methodologyForm]);

  useEffect(() => {
    if (!methodology || !id) {
      setActiveTopic({
        label: topics?.[0].title,
        value: topics?.[0].id.toString(),
      });
    }

    if (topics) {
      methodologyForm.setValue("topicId", topics?.[0]?.id);
    }
  }, [topics, methodologyForm, methodology, id]);

  return (
    <Resource
      title="Методика"
      isExisting={!!id}
      isSaveButtonLoading={isMutatingMethodology}
      onSaveClick={() => onSubmit(methodologyForm.getValues())}
      onDeleteClick={() => deleteMethodology(+id!)}
      isSaveDisabled={
        !isValid || !methodologyForm.formState.isDirty || !activeTopic
      }
      isDeleting={isDeletingMethodology}
      isLoading={isMethodologyLoading}
    >
      <Controller
        name="filePath"
        control={methodologyForm.control}
        render={({ field }) => (
          <CustomInput
            label="Ссылка на методику"
            placeholder="Вставьте ссылку на методику..."
            errorMessage={methodologyForm.formState.errors.filePath?.message}
            {...field}
          />
        )}
      />

      <CustomSelect
        options={topicOptions}
        activeValue={activeTopic}
        onChange={(e) => {
          setActiveTopic({
            label: topicOptions.find(
              (option) => option.value === e.target.value
            )?.label,
            value: e.target.value,
          });
          methodologyForm.setValue("topicId", +e.target.value, {
            shouldDirty: true,
          });
        }}
        label="Топик"
        placeholder="Выберите топик..."
        isLoading={isTopicsLoading}
      />
    </Resource>
  );
}
