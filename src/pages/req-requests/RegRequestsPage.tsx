import ResourceList from "@/components/shared/ResourceList/ResourceList";
import RegRequestsTable from "./components/RegRequestsTable";
import { useRegRequestsQuery } from "@/queries/reg-requests";

function RegRequestsPage() {
  const { data } = useRegRequestsQuery();

  return (
    <ResourceList title="Заявки">
      <RegRequestsTable regRequests={data || []} />
    </ResourceList>
  );
}

export default RegRequestsPage;
