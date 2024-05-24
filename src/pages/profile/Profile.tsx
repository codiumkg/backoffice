import CustomInput from "@/components/shared/CustomInput/CustomInput";
import useAuth from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import { IChangePassword } from "@/interfaces/auth";
import { useChangePassword } from "@/queries/userdata";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function ProfilePage() {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const { logout } = useAuth();

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const [passwordData, setPasswordData] = useState<IChangePassword>({
    newPassword: "",
    currentPassword: "",
  });

  const isChangePasswordDisabled =
    passwordData.newPassword.length < 6 ||
    passwordData.currentPassword.length < 6;

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword({
      onSuccess: () => {
        showSuccessNotification(
          "Пароль успешно изменен, войдите с новым паролем"
        );
        logout();
        onClose();
      },
      onError: () => {
        showErrorNotification("Не удалось изменить пароль");
        onClose();
      },
    });

  const handleChangePassword = () => {
    if (isChangePasswordDisabled) return;

    changePassword(passwordData);
  };

  return (
    <div className="p-6 bg-bgSecondary rounded-xl">
      <section className="flex flex-col gap-4">
        <h1 className="font-bold text-xl">Изменение пароля</h1>
        <form className="flex flex-col gap-3">
          <CustomInput
            name="currentPassword"
            label="Текущий пароль"
            placeholder="Введите текущий пароль..."
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            ignoreRole
          />

          <CustomInput
            name="newPassword"
            label="Новый пароль"
            placeholder="Введите новый пароль..."
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
            ignoreRole
          />

          <div>
            <Button
              color="primary"
              onPress={onOpen}
              isDisabled={isChangePasswordDisabled}
            >
              Изменить
            </Button>
          </div>
        </form>
      </section>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Изменение пароля</ModalHeader>

              <ModalBody>Вы уверены, что хотите изменить пароль?</ModalBody>

              <ModalFooter>
                <Button onPress={onClose}>Отмена</Button>
                <Button
                  color="primary"
                  onPress={handleChangePassword}
                  isLoading={isChangingPassword}
                >
                  Подтвердить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
