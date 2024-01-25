import Typography from "../Typography/Typography";
import { CiCirclePlus } from "react-icons/ci";
import cn from "classnames";
import styles from "./NavElement.module.scss";
import { Link, useLocation } from "react-router-dom";

interface Props {
  title: string;
  href: string;
}

export default function NavElement({ title, href }: Props) {
  const location = useLocation();

  return (
    <Link to={`/office${href}`}>
      <div
        className={cn(
          styles.container,
          location.pathname === `/office${href}` ? styles.active : ""
        )}
      >
        <Typography>{title}</Typography>
        <CiCirclePlus className={styles.addIcon} />
      </div>
    </Link>
  );
}
