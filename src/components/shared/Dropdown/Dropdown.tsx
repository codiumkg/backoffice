import styles from "./Dropdown.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Typography from "../Typography/Typography";

interface Props {
  items: { label: string; value: string }[];
  onSelect?: (value: { label: string; value: string }) => void;
  onClose: () => void;
  isLoading?: boolean;
}

function Dropdown({ items, onClose, onSelect, isLoading = false }: Props) {
  const handleSelect = (value: { label: string; value: string }) => {
    onSelect?.(value);
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose}></div>

      {!isLoading &&
        items.map((item, index) => (
          <div
            key={index}
            className={styles.item}
            onClick={() => handleSelect(item)}
          >
            <Typography variant="body2">{item.label}</Typography>
          </div>
        ))}

      {isLoading && (
        <div className={styles["loading-wrapper"]}>
          <LoadingSpinner light />
        </div>
      )}
    </div>
  );
}

export default Dropdown;
