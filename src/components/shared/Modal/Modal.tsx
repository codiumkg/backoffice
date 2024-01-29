import { ReactNode } from "react";
import Typography from "../Typography/Typography";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

interface Props {
  title: string;
  subtitle: string;
  show: boolean;
  children: ReactNode;
  onPrimaryClick: () => void;
  onClose: () => void;
}

function Modal({
  title,
  subtitle,
  show,
  children,
  onPrimaryClick,
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
        <div>
          <Button text="Сохранить" onClick={onPrimaryClick} />
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
