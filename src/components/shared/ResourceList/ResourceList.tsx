import { ReactNode } from "react";

import { Icons } from "../Icons";
import Typography from "../Typography/Typography";
import { Button } from "@nextui-org/react";

import styles from "./ResourceList.module.scss";
import useIsTeacher from "@/hooks/useIsTeacher";
interface Props {
  title: string;
  onCreateClick?: () => void;
  children?: ReactNode;
  itemsLength?: number;
}

export default function ResourceList({
  title,
  children,
  onCreateClick,
}: Props) {
  const isTeacher = useIsTeacher();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className="flex center">
          <Icons.LIST_BOX className="text-3xl mr-2" />
          <Typography>{title}</Typography>
        </div>

        {!isTeacher && onCreateClick && (
          <div className={styles.buttons}>
            <Button
              onClick={onCreateClick}
              color="primary"
              startContent={<Icons.PLUS className="text-lg" />}
            >
              Добавить
            </Button>
          </div>
        )}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
