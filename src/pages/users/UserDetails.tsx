import CustomInput from "@/components/shared/CustomInput/CustomInput";
import RelationInput from "@/components/shared/RelationInput/RelationInput";
import Resource from "@/components/shared/Resource/Resource";
import { ROLES_DISPLAY, ROLES_OPTIONS } from "@/constants/common";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { Role } from "@/interfaces/auth";
import { IOption } from "@/interfaces/common";
import { ICreateUser } from "@/interfaces/user";
import {
  useUserDeletion,
  useUserDetailsQuery,
  useUserMutation,
} from "@/queries/users";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const initialValues: ICreateUser = {
  username: "",
  password: "",
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

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const userForm = useForm<ICreateUser>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const [activeRole, setActiveRole] = useState<IOption>({
    label: ROLES_DISPLAY[userForm.getValues("role")],
    value: userForm.getValues("role"),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: existingUser, isLoading } = useUserDetailsQuery(+id!, {
    enabled: !!id,
  });

  const { mutate: deleteUser, isPending: isDeleting } = useUserDeletion({
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
  });

  const isValid = Object.values(userForm.formState.errors).length === 0;

  const onSubmit: SubmitHandler<ICreateUser> = (data: ICreateUser) => {
    mutate(data);
  };

  useEffect(() => {
    if (existingUser && id) {
      userForm.reset(existingUser);
    }
  }, [existingUser, userForm, id]);

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
      <CustomInput
        {...userForm.register("firstName")}
        label="Имя"
        placeholder="Введите имя..."
        errorMessage={userForm.formState.errors.firstName?.message}
      />
      <CustomInput
        {...userForm.register("lastName")}
        label="Фамилия"
        placeholder="Введите фамилию..."
        errorMessage={userForm.formState.errors.lastName?.message}
      />
      <CustomInput
        {...userForm.register("username")}
        label="Логин"
        placeholder="Введите логин..."
        errorMessage={userForm.formState.errors.username?.message}
      />
      <CustomInput
        {...userForm.register("password")}
        label="Пароль"
        placeholder="Введите пароль..."
        errorMessage={userForm.formState.errors.password?.message}
      />
      <RelationInput
        name="role"
        options={ROLES_OPTIONS}
        activeValue={activeRole}
        setActiveValue={(value) => {
          userForm.setValue("role", value.value as Role);
          setActiveRole(value);
        }}
        label="Роль"
        placeholder="Выберите роль..."
        onSearch={() => {}}
      />
      <CustomInput
        {...userForm.register("age")}
        label="Возраст"
        placeholder="Введите возраст..."
        type="number"
        errorMessage={userForm.formState.errors.age?.message}
      />

      <CustomInput
        {...userForm.register("phone")}
        label="Номер телефона"
        placeholder="Введите номер телефона..."
        errorMessage={userForm.formState.errors.phone?.message}
      />
      <CustomInput
        {...userForm.register("email")}
        label="Электронная почта"
        placeholder="Введите адрес электронной почты..."
        errorMessage={userForm.formState.errors.email?.message}
      />
    </Resource>
  );
}

export default UserDetails;
