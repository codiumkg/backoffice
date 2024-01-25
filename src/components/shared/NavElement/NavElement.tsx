import Typography from "../Typography/Typography";
import { CiCirclePlus } from "react-icons/ci";
import cn from "classnames";
import styles from "./NavElement.module.scss";
import { Link, useLocation } from "react-router-dom";
import React from "react";

interface Props {
  title: string;
  href: string;
  onCreateClick?: () => void;
}

export default function NavElement({ title, href, onCreateClick }: Props) {
  const location = useLocation();

  const handleCreateClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();

    onCreateClick?.();
  };

  return (
    <Link to={`/office${href}`}>
      <div
        className={cn(
          styles.container,
          location.pathname === `/office${href}` ? styles.active : ""
        )}
      >
        <Typography>{title}</Typography>
        {onCreateClick && (
          <CiCirclePlus
            className={styles.addIcon}
            onClick={handleCreateClick}
          />
        )}
      </div>
    </Link>
  );
}
