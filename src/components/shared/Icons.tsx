import { HTMLAttributes } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdListBox } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineGroup } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { HiMiniPresentationChartLine } from "react-icons/hi2";

interface Props extends HTMLAttributes<SVGElement> {}

export const Icons = {
  PLUS: (props: Props) => <CiCirclePlus {...props} />,
  LIST_BOX: (props: Props) => <IoMdListBox {...props} />,
  USER: (props: Props) => <FaUserLarge {...props} />,
  GROUP: (props: Props) => <MdOutlineGroup {...props} />,
  TASKS_LIST: (props: Props) => <GoTasklist {...props} />,
  PRESENTATION_CHART: (props: Props) => (
    <HiMiniPresentationChartLine {...props} />
  ),
  SEARCH: (props: Props) => <IoSearchOutline {...props} />,
};
