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
import { IMethodology } from "@/interfaces/methodology";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Props {
  methodologies: IMethodology[];
  isLoading: boolean;
}

export default function MethodologiesTable({
  methodologies,
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
        <Table aria-label="Методики">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={methodologies}
            emptyContent="Нет методик."
            isLoading={isLoading}
          >
            {(methodology) => (
              <TableRow
                key={methodology.id}
                onClick={() =>
                  navigate(`${ROUTES.METHODOLOGY}/${methodology.id}`)
                }
              >
                {(columnKey) => (
                  <TableCell>{renderCell(methodology, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
