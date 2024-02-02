import { BsThreeDots } from "react-icons/bs";

import styles from "./ThreeDotButton.module.scss";
import React from "react";

interface Props {
  onClick: (e: React.MouseEvent) => void;
}

function ThreeDotButton({ onClick }: Props) {
  return (
    <div className={styles.container} onClick={onClick}>
      <BsThreeDots />
    </div>
  );
}

export default ThreeDotButton;
