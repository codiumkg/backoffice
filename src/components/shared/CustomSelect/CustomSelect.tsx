import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEventHandler } from "react";

interface Props {
  withSearch?: boolean;
  placeholder?: string;
  label: string;
  isLoading?: boolean;
  options: { label: string; value: string }[];
  errorMessage?: string;
  activeValue: { label?: string; value?: string };
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

function CustomSelect({
  options,
  label,
  activeValue,
  errorMessage,
  placeholder,
  isLoading,
  onChange,
}: Props) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      isLoading={isLoading}
      errorMessage={errorMessage}
      selectedKeys={[activeValue.value || ""]}
      classNames={{ base: ["bg-bgPrimary"], listboxWrapper: ["bg-bgPrimary"] }}
    >
      {options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          classNames={{ wrapper: ["bg-bgPrimary"] }}
        >
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default CustomSelect;
