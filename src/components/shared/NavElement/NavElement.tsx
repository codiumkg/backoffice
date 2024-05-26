import Typography from "../Typography/Typography";
import { CiCirclePlus } from "react-icons/ci";
import cn from "classnames";
import styles from "./NavElement.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

interface Props {
  title: string;
  href: string;
  onCreateClick?: () => void;
}

export default function NavElement({ title, href, onCreateClick }: Props) {
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        styles.container,
        location.pathname === `/office${href}` ? styles.active : ""
      )}
      onClick={() => navigate(`/office${href}`)}
    >
      <Typography>{title}</Typography>
      {onCreateClick && (
        <CiCirclePlus
          className="text-2xl hover:text-primary duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onCreateClick();
          }}
        />
      )}
    </div>
  );
}
