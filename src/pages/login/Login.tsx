import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import CustomInput from "@/components/shared/CustomInput/CustomInput";
import Typography from "@/components/shared/Typography/Typography";
import { useNotification } from "@/hooks/useNotification";
import { ILogin, Role } from "@/interfaces/auth";
import loginRequest from "@/requests/auth/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import useAuth from "@/hooks/useAuth";

import styles from "./Login.module.scss";

const loginValidationSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Логин должен быть не менее 4 символов" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

type LoginValidationSchemaType = z.infer<typeof loginValidationSchema>;

const initialValues = {
  username: "",
  password: "",
};

export default function Login() {
  const { checkIsLoggedIn, setTokenToStorage } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = checkIsLoggedIn();

    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [checkIsLoggedIn, navigate]);

  const loginForm = useForm<LoginValidationSchemaType>({
    defaultValues: initialValues,
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginValidationSchemaType> = (data: ILogin) => {
    setIsLoading(true);
    loginRequest(data)
      .then((res) => {
        if (res.user.role === Role.STUDENT) {
          showErrorNotification("Нет доступа к данному ресурсу");

          return;
        }

        setTokenToStorage(res.token);

        navigate(ROUTES.HOME, { replace: true });
        showSuccessNotification();
      })
      .catch(() => {
        showErrorNotification("Неверный логин или пароль");
      })
      .finally(() => setIsLoading(false));
  };

  const { isDirty, isValid } = loginForm.formState;

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <Typography variant="h2">
          Вход в <span className="text-primary font-bold">Codium Office</span>
        </Typography>
      </div>
      <div className={styles.card}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="username"
            control={loginForm.control}
            render={({ field }) => (
              <CustomInput
                label="Логин"
                placeholder="Введите логин..."
                errorMessage={loginForm.formState.errors.username?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={loginForm.control}
            render={({ field }) => (
              <CustomInput
                label="Пароль"
                placeholder="Введите пароль..."
                type="password"
                errorMessage={loginForm.formState.errors.password?.message}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            disabled={!isValid || !isDirty || isLoading}
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
