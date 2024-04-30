import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import Dropdown from "../Dropdown/Dropdown";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  onSearch: (value: string) => void;
  isLoading?: boolean;
  activeValue: { label?: string; value?: string };
  setActiveValue: (value: { label: string; value: string }) => void;
}

function RelationInput({
  name,
  options,
  label,
  placeholder,
  isLoading,
  onSearch,
  activeValue,
  setActiveValue,
}: Props) {
  const search = useDebouncedCallback((value: string) => {
    onSearch?.(value);
  }, 500);

  return (
    <div>
      <CustomSelect
        options={options}
        label={label}
        placeholder={placeholder}
        activeValue={activeValue}
        onSearch={search}
        withSearch
      />
    </div>
  );
}

export default RelationInput;
