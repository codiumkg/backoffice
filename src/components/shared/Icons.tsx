import { HTMLAttributes } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdListBox } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineGroup } from "react-icons/md";

interface Props extends HTMLAttributes<SVGElement> {}

export const Icons = {
  PLUS: (props: Props) => <CiCirclePlus {...props} />,
  LIST_BOX: (props: Props) => <IoMdListBox {...props} />,
  USER: (props: Props) => <FaUserLarge {...props} />,
  GROUP: (props: Props) => <MdOutlineGroup {...props} />,
};
