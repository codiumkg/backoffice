import CustomInput from "@/components/shared/CustomInput/CustomInput";
import CustomSelect from "@/components/shared/CustomSelect/CustomSelect";
import DocsViewer from "@/components/shared/DocsViewer";
import Resource from "@/components/shared/Resource/Resource";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { IOption } from "@/interfaces/common";
import { IPresentationCreate } from "@/interfaces/presentation";
import {
  usePresentationDeletion,
  usePresentationDetails,
  usePresentationMutation,
} from "@/queries/presentations";
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

export default function PresentationDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { mutatePresentation, isMutatingPresentation } =
    usePresentationMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: [QUERY_KEYS.PRESENTATIONS],
        });

        navigate(ROUTES.PRESENTATIONS);

        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    });

  const { deletePresentation, isDeletingPresentation } =
    usePresentationDeletion({
      onSuccess: () => {
        queryClient.invalidateQueries({
          refetchType: "all",
          queryKey: [QUERY_KEYS.PRESENTATIONS],
        });

        navigate(ROUTES.PRESENTATION);

        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    });

  const { presentation, isPresentationLoading } = usePresentationDetails(+id!);

  const { data: topics, isLoading: isTopicsLoading } = useTopicsQuery({});

  const [activeTopic, setActiveTopic] = useState<IOption>({
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

  const presentationForm = useForm<IPresentationCreate>({
    defaultValues: {
      filePath: "",
    },
    resolver: yupResolver<IPresentationCreate>(validationSchema),
    mode: "onBlur",
  });

  const isValid = Object.values(presentationForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<IPresentationCreate> = (
    data: IPresentationCreate
  ) => {
    mutatePresentation({ data, id: +id! });
  };

  useEffect(() => {
    if (presentation && !!id) {
      presentationForm.reset({
        filePath: presentation.filePath,
        topicId: presentation.topic.id,
      });

      setActiveTopic({
        label: presentation.topic.title,
        value: presentation.topic.id.toString(),
      });
    }
  }, [presentation, id, presentationForm]);

  useEffect(() => {
    if (!presentation || !id) {
      setActiveTopic({
        label: topics?.[0]?.title,
        value: topics?.[0]?.id.toString(),
      });
    }

    if (topics) {
      presentationForm.setValue("topicId", topics?.[0]?.id);
    }
  }, [topics, presentationForm, presentation, id]);

  return (
    <Resource
      title="Презентация"
      isExisting={!!id}
      isSaveButtonLoading={isMutatingPresentation}
      onSaveClick={() => onSubmit(presentationForm.getValues())}
      onDeleteClick={() => deletePresentation(+id!)}
      isSaveDisabled={
        !isValid || !presentationForm.formState.isDirty || !activeTopic
      }
      isDeleting={isDeletingPresentation}
      isLoading={isPresentationLoading}
    >
      <Controller
        name="filePath"
        control={presentationForm.control}
        render={({ field }) => (
          <CustomInput
            label="Ссылка на презентацию"
            placeholder="Вставьте ссылку на презентацию..."
            errorMessage={presentationForm.formState.errors.filePath?.message}
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
          presentationForm.setValue("topicId", +e.target.value, {
            shouldDirty: true,
          });
        }}
        label="Топик"
        placeholder="Выберите топик..."
        isLoading={isTopicsLoading}
      />

      {presentationForm.watch("filePath") && (
        <div>
          <DocsViewer docUrl={presentationForm.watch("filePath")} />
        </div>
      )}
    </Resource>
  );
}
