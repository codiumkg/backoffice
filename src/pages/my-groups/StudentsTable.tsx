import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";
import { IUser } from "@/interfaces/user";

interface Props {
  students: IUser[];
}

export default function StudentsTable({ students }: Props) {
  return (
    <Table aria-label="Студенты">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={students || []} emptyContent="Нет студентов.">
        {(student) => (
          <TableRow key={student.id}>
            {(columnKey) => (
              <TableCell>{renderCell(student, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
