import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { ROUTES } from "@/constants/routes";
import { useTasksQuery } from "@/queries/tasks";
import { useNavigate } from "react-router-dom";

function TasksPage() {
  const { data: tasks, isPending } = useTasksQuery();

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Задачи"
      isLoading={isPending}
      onCreateClick={() => navigate(ROUTES.TASK)}
      itemsLength={tasks?.length}
    >
      <Table
        headers={[{ title: "ID" }, { title: "Содержимое" }, { title: "Топик" }]}
      >
        {tasks?.map((task) => (
          <TableRow
            key={task.id}
            onClick={() => navigate(`${ROUTES.TASK}/${task.id}`)}
          >
            <TableColumn>{task.id}</TableColumn>
            <TableColumn>{task.text}</TableColumn>
            <TableColumn>{task.topic?.title}</TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default TasksPage;
