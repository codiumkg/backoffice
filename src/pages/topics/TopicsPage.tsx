import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { ROUTES } from "@/constants/routes";
import { useTopicsQuery } from "@/queries/topics";
import { useNavigate } from "react-router-dom";

function TopicsPage() {
  const { data: topics, isLoading } = useTopicsQuery({});

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Топики"
      isLoading={isLoading}
      onCreateClick={() => navigate(ROUTES.TOPIC)}
    >
      <Table
        headers={[{ title: "ID" }, { title: "Название" }, { title: "Раздел" }]}
      >
        {topics?.map((topic) => (
          <TableRow
            key={topic.id}
            onClick={() => navigate(`${ROUTES.TOPIC}/${topic.id}`)}
          >
            <TableColumn>{topic.id}</TableColumn>
            <TableColumn>{topic.title}</TableColumn>
            <TableColumn>{topic.section.title}</TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default TopicsPage;
