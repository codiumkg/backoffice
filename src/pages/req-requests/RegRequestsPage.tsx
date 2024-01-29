import ResourceList from "@/components/shared/ResourceList/ResourceList";
import RegRequestsTable from "./components/RegRequestsTable";
import { useRegRequestsQuery } from "@/queries/reg-requests";

function RegRequestsPage() {
  const { data, isLoading } = useRegRequestsQuery();

  return (
    <ResourceList title="Заявки" isLoading={isLoading}>
      <RegRequestsTable regRequests={data || []} />
    </ResourceList>
  );
}

export default RegRequestsPage;
