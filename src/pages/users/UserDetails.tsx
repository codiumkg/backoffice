import CustomInput from "@/components/shared/CustomInput/CustomInput";
import CustomSelect from "@/components/shared/CustomSelect/CustomSelect";
import Resource from "@/components/shared/Resource/Resource";
import { ROLES_DISPLAY, ROLES_OPTIONS } from "@/constants/common";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { Role } from "@/interfaces/auth";
import { IOption } from "@/interfaces/common";
import { ICreateUser } from "@/interfaces/user";
import { useGroupsQuery } from "@/queries/groups";
import {
  usePasswordReset,
  useUserDeletion,
  useUserDetailsQuery,
  useUserMutation,
} from "@/queries/users";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const initialValues: ICreateUser = {
  username: "",
  phone: "",
  role: Role.STUDENT,
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  image: "",
  age: 18,
};

function UserDetails() {
  const { id } = useParams();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const userForm = useForm<ICreateUser>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const { data: groups, isLoading: isGroupsLoading } = useGroupsQuery();

  const [activeRole, setActiveRole] = useState<IOption>({
    label: ROLES_DISPLAY[userForm.getValues("role")],
    value: userForm.getValues("role"),
  });

  const [activeGroup, setActiveGroup] = useState<IOption>({
    label: groups?.[0]?.title,
    value: groups?.[0]?.id.toString(),
  });

  const groupOptions = useMemo(
    () =>
      groups?.map((group) => ({
        label: group.title,
        value: group.id.toString(),
      })),
    [groups]
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: existingUser, isLoading } = useUserDetailsQuery(+id!, {
    enabled: !!id,
  });

  const { mutate: deleteUser, isPending: isDeleting } = useUserDeletion({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
        exact: true,
      });

      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.GROUP_STUDENTS],
      });

      navigate(ROUTES.USERS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
  });

  const { mutate, isPending } = useUserMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: [QUERY_KEYS.USERS],
      });

      navigate(ROUTES.USERS);

      showSuccessNotification();
    },
    onError: () => {
      showErrorNotification();
    },
    id: +id!,
  });

  const { mutate: resetPassword, isPending: isResetingPassword } =
    usePasswordReset({
      onSuccess: () => {
        showSuccessNotification("Пароль успешно сброшен!");
        onClose();
      },
      onError: () => {
        showErrorNotification("Не удалось сбросить пароль");
        onClose();
      },
    });

  const isValid = Object.values(userForm.formState.errors).length === 0;

  const handleResetPassword = () => {
    if (!existingUser) return;

    resetPassword(existingUser.id);
  };

  const onSubmit: SubmitHandler<ICreateUser> = (data: ICreateUser) => {
    if (userForm.getValues("email")?.length === 0) {
      delete data["email"];
    }

    if (userForm.getValues("phone")?.length === 0) {
      delete data["phone"];
    }

    if (userForm.watch("role") !== Role.STUDENT) {
      delete data["groupId"];
    }

    mutate({ ...data, age: Number(data.age) });
  };

  useEffect(() => {
    if (existingUser && id) {
      userForm.reset({
        username: existingUser.username,
        email: existingUser.email,
        phone: existingUser.phone,
        age: existingUser.profile?.age,
        firstName: existingUser.profile?.firstName,
        lastName: existingUser.profile?.lastName,
        groupId: existingUser.groupId,
        role: existingUser.role,
      });

      setActiveGroup({
        label: existingUser.group?.title,
        value: existingUser.groupId?.toString(),
      });

      setActiveRole({
        label: ROLES_DISPLAY[existingUser.role],
        value: existingUser.role,
      });
    }
  }, [existingUser, userForm, id]);

  useEffect(() => {
    if (!existingUser || !id) {
      setActiveGroup({
        label: groups?.[0]?.title,
        value: groups?.[0]?.id.toString(),
      });

      if (groups) {
        userForm.setValue("groupId", groups[0]?.id);
      }
    }
  }, [groups, userForm, existingUser, id]);

  return (
    <Resource
      title={existingUser?.username || "Пользователь"}
      isExisting={!!id}
      isLoading={isLoading}
      onDeleteClick={() => deleteUser(+id!)}
      isDeleting={isDeleting}
      isSaveDisabled={!isValid || !userForm.formState.isDirty}
      isSaveButtonLoading={isPending}
      onSaveClick={() => onSubmit(userForm.getValues())}
    >
      <Controller
        name="firstName"
        control={userForm.control}
        render={({ field }) => (
          <CustomInput
            label="Имя"
            placeholder="Введите имя..."
            errorMessage={userForm.formState.errors.firstName?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="lastName"
        control={userForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Фамилия"
            placeholder="Введите фамилию..."
            errorMessage={userForm.formState.errors.lastName?.message}
          />
        )}
      />

      <Controller
        name="username"
        control={userForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Логин"
            placeholder="Введите логин..."
            errorMessage={userForm.formState.errors.username?.message}
          />
        )}
      />

      <CustomSelect
        options={ROLES_OPTIONS}
        activeValue={activeRole}
        onChange={(e) => {
          setActiveRole({
            label: ROLES_OPTIONS.find((role) => role.value === e.target.value)
              ?.label,
            value: e.target.value,
          });
          userForm.setValue("role", e.target.value as Role, {
            shouldDirty: true,
          });
        }}
        label="Роль"
        placeholder="Выберите роль..."
      />

      {userForm.watch("role") === Role.STUDENT && (
        <CustomSelect
          options={groupOptions || []}
          activeValue={activeGroup}
          onChange={(e) => {
            setActiveGroup({
              label: groupOptions?.find(
                (option) => option.value === e.target.value
              )?.label,
              value: e.target.value,
            });
            userForm.setValue("groupId", +e.target.value, {
              shouldDirty: true,
            });
          }}
          label="Группа"
          placeholder="Выберите группу..."
          isLoading={isGroupsLoading}
        />
      )}

      <Controller
        name="age"
        control={userForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Возраст"
            value={field.value?.toString()}
            placeholder="Введите возраст..."
            type="number"
            errorMessage={userForm.formState.errors.age?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={userForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Номер телефона"
            placeholder="Введите номер телефона..."
            errorMessage={userForm.formState.errors.phone?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={userForm.control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Электронная почта"
            placeholder="Введите адрес электронной почты..."
            errorMessage={userForm.formState.errors.email?.message}
          />
        )}
      />

      {!!existingUser && id && (
        <div>
          <Button
            color="danger"
            size="sm"
            isLoading={isResetingPassword}
            onPress={onOpen}
          >
            Cбросить пароль
          </Button>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalBody>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  Вы уверены что хотите сбросить пароль?
                </ModalHeader>
                <ModalFooter>
                  <Button onPress={onClose}>Отмена</Button>
                  <Button
                    onPress={handleResetPassword}
                    color="danger"
                    isLoading={isResetingPassword}
                  >
                    Подтвердить
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </Resource>
  );
}

export default UserDetails;
