import cn from "classnames";

import styles from "./LoadingSpinner.module.scss";

interface Props {
  size?: "s" | "m" | "l" | "xl";
  light?: boolean;
}

export default function LoadingSpinner({ size = "s", light = false }: Props) {
  return (
    <div
      className={cn(
        styles.spinner,
        styles[`size-${size}`],
        light ? styles.light : ""
      )}
    ></div>
  );
}
