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
  return (
    <div className={styles["wrapper"]}>
      {!!label && <Typography variant="body3">{label}</Typography>}
      <div
        className={cn(
          styles["checkbox-wrapper"],
          value ? styles["active"] : ""
        )}
        onClick={() => {
          onClick();
        }}
      >
        <div
          className={cn(styles["box"], value ? styles["box-active"] : "")}
        ></div>
      </div>
    </div>
  );
}
