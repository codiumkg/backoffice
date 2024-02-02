import { ITableHeader } from "@/interfaces/table";
import { ReactNode, useEffect, useRef, useState } from "react";
import cn from "classnames";
import ContextMenu from "../ContextMenu/ContextMenu";
import ThreeDotButton from "../ThreeDotButton/ThreeDotButton";

import styles from "./Table.module.scss";
import Modal from "../Modal/Modal";

interface Props {
  headers: ITableHeader[];
  children: ReactNode;
}

export default function Table({ headers, children }: Props) {
  return (
    <div className={cn(styles.wrapper, "flex-col")}>
      <div className={cn(styles.header, "flex")}>
        {headers.map(({ title }) => (
          <div key={title} className={styles.column}>
            {title}
          </div>
        ))}
      </div>

      <div>{children}</div>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export function TableRow({
  children,
  isDeleting,
  onClick,
  onDelete,
}: TableRowProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.rowWrapper}>
      <div className={styles.row} onClick={onClick}>
        <div className={styles.content}>{children}</div>

        <ThreeDotButton onClick={() => setShowContextMenu(true)} />
      </div>

      <div ref={menuRef}>
        <ContextMenu
          show={showContextMenu}
          items={[
            {
              id: "delete",
              title: "Удалить",
              onClick: () => {
                setShowContextMenu(false);
                setShowConfirmModal(true);
              },
            },
          ]}
        />
      </div>

      <Modal
        show={showConfirmModal}
        title="Удаление"
        subtitle="Вы уверене что хотите удалить?"
        primaryButtonText="Удалить"
        isLoading={isDeleting}
        onPrimaryClick={() => onDelete?.()}
        onClose={() => setShowConfirmModal(false)}
        onCancelClick={() => setShowConfirmModal(false)}
      />
    </div>
  );
}

interface TableColumnProps {
  flex?: number;
  children: ReactNode;
}

export function TableColumn({ flex = 1, children }: TableColumnProps) {
  return (
    <div className={styles.column} style={{ flex }}>
      {children}
    </div>
  );
}
