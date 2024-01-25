import { useGroupsQuery } from "@/queries/groups";
import GroupsList from "./components/GroupsList";

function GroupsPage() {
  const { data } = useGroupsQuery();

  return <GroupsList groups={data || []} />;
}

export default GroupsPage;
