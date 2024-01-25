import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { useSectionsQuery } from "@/queries/sections";

function SectionsPage() {
  const { data: sections } = useSectionsQuery();

  return (
    <ResourceList title="">
      <Table
        headers={[{ title: "ID" }, { title: "Название" }, { title: "Предмет" }]}
      >
        {sections?.map((section) => (
          <TableRow key={section.id}>
            <TableColumn>{section.id}</TableColumn>
            <TableColumn>{section.title}</TableColumn>
            <TableColumn>{section.subject.title}</TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default SectionsPage;
