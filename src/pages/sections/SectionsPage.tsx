import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { ROUTES } from "@/constants/routes";
import { useSectionsQuery } from "@/queries/sections";
import { useNavigate } from "react-router-dom";

function SectionsPage() {
  const { data: sections, isPending } = useSectionsQuery({});

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Разделы"
      isLoading={isPending}
      onCreateClick={() => navigate(ROUTES.SECTION)}
    >
      <Table
        headers={[{ title: "ID" }, { title: "Название" }, { title: "Предмет" }]}
      >
        {sections?.map((section) => (
          <TableRow
            key={section.id}
            onClick={() => navigate(`${ROUTES.SECTION}/${section.id}`)}
          >
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
