import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { ROLES_DISPLAY } from "@/constants/common";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotification";
import { useUserDeletion, useUsersQuery } from "@/queries/users";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useUsersQuery();

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const { mutate: deleteUser, isPending } = useUserDeletion({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      showSuccessNotification("Удалено!");
    },

    onError: () => {
      showErrorNotification();
    },
  });

  return (
    <ResourceList
      title="Пользователи"
      isLoading={isLoading}
      onCreateClick={() => navigate(ROUTES.USER)}
      itemsLength={users?.length}
    >
      <Table headers={[{ title: "ID" }, { title: "Логин" }, { title: "Роль" }]}>
        {users?.map((user) => (
          <TableRow
            key={user.id}
            onClick={() => navigate(`${ROUTES.USER}/${user.id}`)}
            onDelete={() => deleteUser(user.id)}
            isDeleting={isPending}
          >
            <TableColumn>{user.id}</TableColumn>
            <TableColumn>{user.username}</TableColumn>
            <TableColumn>{ROLES_DISPLAY[user.role]}</TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default UsersPage;
