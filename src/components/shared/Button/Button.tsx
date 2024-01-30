import cn from "classnames";
import styles from "./Button.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface Props {
  text?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isTextButton?: boolean;
  height?: string;
  type?: "button" | "submit";
  color?: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

export default function Button({
  text,
  type = "button",
  disabled = false,
  height = "42px",
  color = "var(--accent-color)",
  isLoading,
  icon,
  isTextButton,
  onClick,
}: Props) {
  const handleClick = () => {
    if (isLoading) return;

    onClick?.();
  };

  return (
    <button
      className={cn(styles.primary, disabled ? styles.disabled : "")}
      style={{
        minHeight: height,
        background: !isTextButton ? (!disabled ? color : "") : "transparent",
        color: isTextButton ? color : "",
      }}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {!isLoading ? (
        <>
          {icon && <div className={styles.icon}>{icon}</div>}
          {text && <div>{text}</div>}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </button>
  );
}
