import Typography from "../Typography/Typography";
import { CiCirclePlus } from "react-icons/ci";
import cn from "classnames";
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
        "flex justify-between items-center w-full h-[42px] rounded-2xl border border-background hover:border-secondary duration-300 py-2 px-4 cursor-pointer",
        location.pathname === `/office${href}` ? "bg-primary" : ""
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
