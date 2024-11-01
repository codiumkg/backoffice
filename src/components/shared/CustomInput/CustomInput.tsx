import {
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { Input } from "@nextui-org/react";
import useIsTeacher from "@/hooks/useIsTeacher";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  startContent?: ReactNode;
  isViewOnly?: boolean;
  ignoreRole?: boolean;
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
      startContent,
      onChange,
      isViewOnly = false,
      ignoreRole = false,
    },
    ref?
  ) {
    const isTeacher = useIsTeacher();

    return (
      <Input
        // classNames={{ inputWrapper: ["bg-bgPrimary"] }}
        startContent={startContent}
        onChange={onChange}
        ref={ref}
        value={value}
        placeholder={placeholder}
        label={label}
        type={type}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
        isDisabled={isViewOnly || (!ignoreRole && isTeacher)}
      />
    );
  }
);

export default CustomInput;
