import { ReactNode } from "react";

import { IoMdListBox } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

import Typography from "../Typography/Typography";
import Button from "../Button/Button";

import styles from "./ResourceList.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface Props {
  title: string;
  onCreateClick?: () => void;
  children?: ReactNode;
  isLoading: boolean;
}

export default function ResourceList({
  title,
  children,
  isLoading,
  onCreateClick,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className="flex center">
          <IoMdListBox className={styles.icon} />
          <Typography>{title}</Typography>
        </div>

        {onCreateClick && (
          <div className={styles.buttons}>
            <Button
              text="Добавить"
              height="36px"
              icon={<CiCirclePlus />}
              onClick={onCreateClick}
            />
          </div>
        )}
      </div>

      <div className={styles.content}>{children}</div>

      {isLoading && (
        <div className={styles["loading-wrapper"]}>
          <LoadingSpinner light size="l" />
        </div>
      )}
    </div>
  );
}
