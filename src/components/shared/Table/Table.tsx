import { ITableHeader } from "@/interfaces/table";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import ContextMenu from "../ContextMenu/ContextMenu";
import ThreeDotButton from "../ThreeDotButton/ThreeDotButton";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBodyProps,
} from "@nextui-org/react";
import styles from "./Table.module.scss";
import Modal from "../Modal/Modal";

interface Props {
  headers: ITableHeader[];
  tableBody: ReactElement<
    TableBodyProps<object>,
    string | JSXElementConstructor<any>
  >;
}

export default function CustomTable({ headers, tableBody }: Props) {
  return (
    <Table>
      <TableHeader columns={headers}>
        {(header) => (
          <TableColumn key={header.title}>{header.title}</TableColumn>
        )}
      </TableHeader>
      {tableBody}
    </Table>
  );
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export function CustomTableRow({
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

        {onDelete && (
          <ThreeDotButton
            onClick={(e) => {
              e.stopPropagation();
              setShowContextMenu(true);
            }}
          />
        )}
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

export function CustomTableColumn({ flex = 1, children }: TableColumnProps) {
  return (
    <div className={styles.column} style={{ flex }}>
      {children}
    </div>
  );
}
