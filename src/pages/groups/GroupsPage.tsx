import { useGroupsQuery } from "@/queries/groups";
import GroupsList from "./components/GroupsList";
import { useSearchParams } from "react-router-dom";

function GroupsPage() {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useGroupsQuery({
    search: searchParams.get("search"),
    teacherId: Number(searchParams.get("teacherId")),
  });

  return <GroupsList groups={data || []} isLoading={isLoading} />;
}

export default GroupsPage;
