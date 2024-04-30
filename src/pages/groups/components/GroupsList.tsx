import { IGroup } from "@/interfaces/group";
import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";

interface Props {
  groups: IGroup[];
  isLoading: boolean;
}

function GroupsList({ groups, isLoading }: Props) {
  const navigate = useNavigate();

  return (
    <ResourceList
      title="Группы"
      onCreateClick={() => navigate(ROUTES.GROUP)}
      itemsLength={groups.length}
    >
      <Table aria-label="Группы">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={groups}
          emptyContent="Нет групп."
          isLoading={isLoading}
        >
          {(group) => (
            <TableRow
              key={group.id}
              onClick={() => navigate(`${ROUTES.GROUP}/${group.id}`)}
            >
              {(columnKey) => (
                // @ts-expect-error render relation fields
                <TableCell>{renderCell(group, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ResourceList>
  );
}

export default GroupsList;
