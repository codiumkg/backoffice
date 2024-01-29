import { useGroupsQuery } from "@/queries/groups";
import GroupsList from "./components/GroupsList";

function GroupsPage() {
  const { data, isLoading } = useGroupsQuery();

  return <GroupsList groups={data || []} isLoading={isLoading} />;
}

export default GroupsPage;
