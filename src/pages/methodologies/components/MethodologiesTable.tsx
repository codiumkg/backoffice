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

interface Props {
  methodologies: IMethodology[];
  isLoading: boolean;
}

export default function MethodologiesTable({
  methodologies,
  isLoading,
}: Props) {
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
              <TableRow key={methodology.id}>
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
