import { HTMLAttributes } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdListBox } from "react-icons/io";

interface Props extends HTMLAttributes<SVGElement> {}

export const Icons = {
  PLUS: (props: Props) => <CiCirclePlus {...props} />,
  LIST_BOX: (props: Props) => <IoMdListBox {...props} />,
};
