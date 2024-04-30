import {
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { Input } from "@nextui-org/react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  onChangeCallback?: (value: string) => void;
}

const CustomInput: FC<Props> = forwardRef<HTMLInputElement, Props>(
  function InputCustom(
    { value, placeholder, label, type, errorMessage, onChange },
    ref?
  ) {
    return (
      <Input
        onChange={onChange}
        ref={ref}
        value={value}
        placeholder={placeholder}
        label={label}
        type={type}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      />
    );
  }
);

export default CustomInput;
