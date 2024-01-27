import Typography from "../Typography/Typography";

import styles from "./CustomSelect.module.scss";
import CustomInput from "../CustomInput/CustomInput";

interface Props {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  errorMessage?: string;
  withSearch?: boolean;
  onSearch?: (value: string) => void;
  onClick?: () => void;
  placeholder?: string;
  activeValue: { label?: string; value?: string };
}

function CustomSelect({
  options,
  label,
  name,
  activeValue,
  errorMessage,
  onSearch,
  withSearch = false,
  placeholder,
  onClick,
}: Props) {
  return (
    <div>
      <div className={styles.container} onClick={onClick}>
        {!!label && <label htmlFor={name}>{label}</label>}

        {withSearch ? (
          <CustomInput
            name={name}
            placeholder={placeholder}
            onChangeCallback={(value) => onSearch?.(value)}
            value={activeValue.label}
          />
        ) : (
          <select>
            {options.map((option, index) => (
              <option key={index}>{option.value}</option>
            ))}
          </select>
        )}
      </div>
      <div className={styles.error}>
        <Typography variant="body3" color="var(--danger-color)">
          {errorMessage}
        </Typography>
      </div>
    </div>
  );
}

export default CustomSelect;
