import { useState } from "react";

import styles from "./Checkbox.module.scss";
import Typography from "../Typography/Typography";
import cn from "classnames";

interface Props {
  label?: string;
  value: boolean;
  onChangeCallback?: (value: boolean) => void;
  onClick: () => void;
}

export default function Checkbox({ label, value, onClick }: Props) {
  const [isChecked, setIsChecked] = useState(value);

  return (
    <div className={styles["wrapper"]}>
      {!!label && <Typography variant="body3">{label}</Typography>}
      <div
        className={cn(
          styles["checkbox-wrapper"],
          isChecked ? styles["active"] : ""
        )}
        onClick={() => {
          onClick();
          setIsChecked(!isChecked);
        }}
      >
        <div
          className={cn(styles["box"], isChecked ? styles["box-active"] : "")}
        ></div>
      </div>
    </div>
  );
}
