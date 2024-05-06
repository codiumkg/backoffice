import ResourceList from "@/components/shared/ResourceList/ResourceList";
// import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
// import { useNotification } from "@/hooks/useNotification";
import { useUsersQuery } from "@/queries/users";
// import { useQueryClient } from "@tanstack/react-query";
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

function UsersPage() {
  const navigate = useNavigate();

  // const queryClient = useQueryClient();

  const { data: users, isLoading } = useUsersQuery();

  // const { showErrorNotification, showSuccessNotification } = useNotification();

  // const { mutate: deleteUser, isPending } = useUserDeletion({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
  //     showSuccessNotification("Удалено!");
  //   },

  //   onError: () => {
  //     showErrorNotification();
  //   },
  // });

  return (
    <ResourceList
      title="Пользователи"
      onCreateClick={() => navigate(ROUTES.USER)}
      itemsLength={users?.length}
    >
      <Table aria-label="Заявки">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={users || []}
          emptyContent="Нет заявок."
          isLoading={isLoading}
        >
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
    </ResourceList>
  );
}

export default UsersPage;
