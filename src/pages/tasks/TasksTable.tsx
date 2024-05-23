import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";
import { ITask } from "@/interfaces/task";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Props {
  tasks: ITask[];
}

export default function TasksTable({ tasks }: Props) {
  const navigate = useNavigate();

  return (
    <Table aria-label="Задачи">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={tasks || []} emptyContent="Нет задач.">
        {(task) => (
          <TableRow
            key={task.id}
            onClick={() => navigate(`${ROUTES.TASK}/${task.id}`)}
          >
            {(columnKey) => (
              <TableCell>{renderCell(task, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
