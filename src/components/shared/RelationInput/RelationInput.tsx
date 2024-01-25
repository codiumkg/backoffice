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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const search = useDebouncedCallback((value: string) => {
    onSearch?.(value);
  }, 500);

  const handleSelect = (value: { label: string; value: string }) => {
    setActiveValue(value);
  };

  return (
    <div>
      <CustomSelect
        name={name}
        options={options}
        label={label}
        placeholder={placeholder}
        activeValue={activeValue}
        onClick={() => setIsMenuOpen(true)}
        onSearch={search}
        withSearch
      />

      {isMenuOpen && (
        <Dropdown
          items={options}
          onClose={() => setIsMenuOpen(false)}
          onSelect={handleSelect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default RelationInput;
