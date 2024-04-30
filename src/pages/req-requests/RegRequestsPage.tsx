import ResourceList from "@/components/shared/ResourceList/ResourceList";
import RegRequestsTable from "./components/RegRequestsTable";
import { useRegRequestsQuery } from "@/queries/reg-requests";

function RegRequestsPage() {
  const { data, isLoading } = useRegRequestsQuery();

  return (
    <ResourceList title="Заявки" itemsLength={data?.length}>
      <RegRequestsTable regRequests={data || []} isLoading={isLoading} />
    </ResourceList>
  );
}

export default RegRequestsPage;
