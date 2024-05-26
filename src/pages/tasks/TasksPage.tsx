import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useTasksQuery } from "@/queries/tasks";
import { Spinner } from "@nextui-org/react";

import { useNavigate, useSearchParams } from "react-router-dom";
import TasksTable from "./TasksTable";

function TasksPage() {
  const [searchParams] = useSearchParams();

  const { data: tasks, isPending } = useTasksQuery({
    search: searchParams.get("search"),
  });

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Задачи"
      onCreateClick={() => navigate(ROUTES.TASK)}
      itemsLength={tasks?.length}
      withSearch
    >
      {isPending && (
        <div className="p-40">
          <Spinner />
        </div>
      )}

      {!isPending && <TasksTable tasks={tasks || []} />}
    </ResourceList>
  );
}

export default TasksPage;
