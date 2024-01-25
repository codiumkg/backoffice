"use client";

import styles from "./Resource.module.scss";
import Typography from "../Typography/Typography";
import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export default function Resource({ title, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography>{title}</Typography>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
