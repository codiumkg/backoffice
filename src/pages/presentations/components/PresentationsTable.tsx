import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";
import { IPresentation } from "@/interfaces/presentation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Props {
  presentations: IPresentation[];
  isLoading: boolean;
}

export default function PresentationsTable({
  presentations,
  isLoading,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      {isLoading && (
        <div className="p-40">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <Table aria-label="Презентации">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={presentations}
            emptyContent="Нет презентаций."
            isLoading={isLoading}
          >
            {(presentation) => (
              <TableRow
                key={presentation.id}
                onClick={() =>
                  navigate(`${ROUTES.PRESENTATION}/${presentation.id}`)
                }
              >
                {(columnKey) => (
                  <TableCell>{renderCell(presentation, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
