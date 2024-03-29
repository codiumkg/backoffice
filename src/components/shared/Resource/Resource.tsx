import styles from "./Resource.module.scss";
import Typography from "../Typography/Typography";
import { ReactNode, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface Props {
  title: string;
  children?: ReactNode;
  isLoading?: boolean;
  isSaveButtonLoading: boolean;
  isSaveDisabled?: boolean;
  isExisting?: boolean;
  isDeleting?: boolean;
  onSaveClick: () => void;
  onDeleteClick: () => void;
}

export default function Resource({
  title,
  children,
  isLoading,
  isSaveButtonLoading,
  isSaveDisabled,
  isExisting,
  isDeleting,
  onSaveClick,
  onDeleteClick,
}: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography>{title}</Typography>

        <div className={styles.buttons}>
          {isExisting && (
            <Button
              text="Удалить"
              onClick={handleDeleteClick}
              height="40px"
              color="var(--danger-color)"
              isLoading={isDeleting}
              isTextButton
            />
          )}

          <Button
            onClick={onSaveClick}
            text="Сохранить"
            height="40px"
            disabled={isSaveDisabled}
            isLoading={isSaveButtonLoading}
          />
        </div>
      </div>

      <div className={styles.content}>
        {!isLoading && <div>{children}</div>}
        {isLoading && (
          <div className={styles["spinner-wrapper"]}>
            <LoadingSpinner light size="l" />
          </div>
        )}
      </div>

      <Modal
        show={showConfirmModal}
        title="Удаление"
        subtitle="Вы уверене что хотите удалить?"
        primaryButtonText="Удалить"
        isLoading={isDeleting}
        onPrimaryClick={onDeleteClick}
        onClose={() => setShowConfirmModal(false)}
        onCancelClick={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
