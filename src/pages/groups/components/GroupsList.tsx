import { IGroup } from "@/interfaces/group";
import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  groups: IGroup[];
  isLoading: boolean;
}

function GroupsList({ groups, isLoading }: Props) {
  const navigate = useNavigate();

  return (
    <ResourceList
      title="Группы"
      isLoading={isLoading}
      onCreateClick={() => navigate(ROUTES.GROUP)}
    >
      <Table
        headers={[{ title: "ID" }, { title: "Название" }, { title: "Предмет" }]}
      >
        {groups.map((group) => (
          <TableRow
            key={group.id}
            onClick={() => navigate(`${ROUTES.GROUP}/${group.id}`)}
          >
            <TableColumn>{group.id}</TableColumn>
            <TableColumn>{group.title}</TableColumn>
            <TableColumn>{group.subject.title}</TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default GroupsList;
