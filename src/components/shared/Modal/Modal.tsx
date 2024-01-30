import { ReactNode } from "react";
import Typography from "../Typography/Typography";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

interface Props {
  title: string;
  subtitle: string;
  show: boolean;
  children?: ReactNode;
  isLoading?: boolean;
  primaryButtonText?: string;
  onPrimaryClick: () => void;
  onCancelClick?: () => void;
  onClose: () => void;
}

function Modal({
  title,
  subtitle,
  show,
  children,
  primaryButtonText = "Сохранить",
  isLoading,
  onPrimaryClick,
  onCancelClick,
  onClose,
}: Props) {
  return show ? (
    <div className={styles["modal-wrapper"]}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.modal}>
        <div className={styles.title}>
          <Typography variant="h2" weight="600">
            {title}
          </Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="body2">{subtitle}</Typography>
        </div>
        <div>{children}</div>
        <div className={styles.buttons}>
          <Button
            text={primaryButtonText || "Сохранить"}
            isLoading={isLoading}
            onClick={onPrimaryClick}
          />
          {onCancelClick && (
            <Button
              text="Отмена"
              onClick={onCancelClick}
              color="var(--text-color)"
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
