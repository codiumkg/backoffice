"use client";

import { ReactNode } from "react";

import { IoMdListBox } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

import Typography from "../Typography/Typography";
import Button from "../Button/Button";

import styles from "./ResourceList.module.scss";

interface Props {
  title: string;
  onCreateClick?: () => void;
  children?: ReactNode;
}

export default function ResourceList({
  title,
  children,
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
    </div>
  );
}
