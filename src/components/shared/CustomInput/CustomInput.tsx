import {
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { Input } from "@nextui-org/react";
import useIsTeacher from "@/hooks/useIsTeacher";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  isViewOnly?: boolean;
  onChangeCallback?: (value: string) => void;
}

const CustomInput: FC<Props> = forwardRef<HTMLInputElement, Props>(
  function InputCustom(
    {
      value,
      placeholder,
      label,
      type,
      errorMessage,
      onChange,
      isViewOnly = false,
    },
    ref?
  ) {
    const isTeacher = useIsTeacher();

    return (
      <Input
        classNames={{ inputWrapper: ["bg-bgPrimary"] }}
        onChange={onChange}
        ref={ref}
        value={value}
        placeholder={placeholder}
        label={label}
        type={type}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
        isDisabled={isViewOnly || isTeacher}
      />
    );
  }
);

export default CustomInput;
