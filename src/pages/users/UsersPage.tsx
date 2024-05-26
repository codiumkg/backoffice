import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useUsersQuery } from "@/queries/users";
import { Spinner } from "@nextui-org/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UsersTable from "./UsersTable";
import { Role } from "@/interfaces/auth";

function UsersPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { data: users, isLoading } = useUsersQuery({
    search: searchParams.get("search"),
    groupId: Number(searchParams.get("groupId")),
    role: searchParams.get("role") as Role,
  });

  return (
    <ResourceList
      title="Пользователи"
      onCreateClick={() => navigate(ROUTES.USER)}
      itemsLength={users?.length}
      withSearch
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
