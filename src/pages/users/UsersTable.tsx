import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";
import { IUser } from "@/interfaces/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Props {
  users: IUser[];
}

export default function UsersTable({ users }: Props) {
  const navigate = useNavigate();

  return (
    <Table aria-label="Пользователи">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={users || []} emptyContent="Нет пользователей.">
        {(user) => (
          <TableRow
            key={user.id}
            onClick={() => navigate(`${ROUTES.USER}/${user.id}`)}
          >
            {(columnKey) => (
              <TableCell>{renderCell(user, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
