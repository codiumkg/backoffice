import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useTasksQuery } from "@/queries/tasks";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { columns, renderCell } from "./columns";

function TasksPage() {
  const { data: tasks, isPending } = useTasksQuery();

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Задачи"
      onCreateClick={() => navigate(ROUTES.TASK)}
      itemsLength={tasks?.length}
    >
      {isPending && (
        <div className="p-40">
          <Spinner />
        </div>
      )}

      {!isPending && (
        <Table aria-label="Задачи">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={tasks || []}
            emptyContent="Нет задач."
            isLoading={isPending}
          >
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
      )}
    </ResourceList>
  );
}

export default TasksPage;
