import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { useTopicsQuery } from "@/queries/topics";

function TopicsPage() {
  const { data: topics } = useTopicsQuery();

  return (
    <ResourceList title="Топики">
      <Table
        headers={[{ title: "ID" }, { title: "Название" }, { title: "Раздел" }]}
      >
        {topics?.map((topic) => (
          <TableRow key={topic.id}>
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
