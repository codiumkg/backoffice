import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useUsersQuery } from "@/queries/users";
import { Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import UsersTable from "./UsersTable";

function UsersPage() {
  const navigate = useNavigate();

  const { data: users, isLoading } = useUsersQuery();

  return (
    <ResourceList
      title="Пользователи"
      onCreateClick={() => navigate(ROUTES.USER)}
      itemsLength={users?.length}
    >
      {isLoading && (
        <div className="p-40">
          <Spinner />
        </div>
      )}
      {!isLoading && <UsersTable users={users || []} />}
    </ResourceList>
  );
}

export default UsersPage;
