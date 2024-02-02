import { TfiLayoutListThumbAlt } from "react-icons/tfi";

import styles from "./NoDataPlaceholder.module.scss";
import Typography from "../Typography/Typography";

interface Props {
  text?: string;
}

function NoDataPlaceholder({ text = "Результаты не найдены" }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <TfiLayoutListThumbAlt className={styles.icon} />

        <Typography variant="h3">{text}</Typography>
      </div>
    </div>
  );
}

export default NoDataPlaceholder;
