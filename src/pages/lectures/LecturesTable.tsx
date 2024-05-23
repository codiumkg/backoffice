import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";
import { ILecture } from "@/interfaces/lecture";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Props {
  lectures: ILecture[];
}

export default function LecturesTable({ lectures }: Props) {
  const navigate = useNavigate();

  return (
    <Table aria-label="Лекции">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={lectures || []} emptyContent="Нет лекций.">
        {(lecture) => (
          <TableRow
            key={lecture.id}
            onClick={() => navigate(`${ROUTES.LECTURE}/${lecture.id}`)}
          >
            {(columnKey) => (
              <TableCell>{renderCell(lecture, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
