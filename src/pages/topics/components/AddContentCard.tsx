import styles from "./ContentCard.module.scss";
import { TiPlus } from "react-icons/ti";
import cn from "classnames";

export default function AddContentCard() {
  return (
    <div className={cn(styles.card, styles.add)} style={{ opacity: "0.6" }}>
      <TiPlus style={{ fontSize: "20px" }} />
    </div>
  );
}
