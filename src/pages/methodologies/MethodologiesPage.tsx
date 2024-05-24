import ResourceList from "@/components/shared/ResourceList/ResourceList";
import MethodologiesTable from "./components/MethodologiesTable";
import { useMethodologies } from "@/queries/methodologies";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function MethodologiesPage() {
  const navigate = useNavigate();

  const { methodologies, isMethodologiesLoading } = useMethodologies();

  return (
    <ResourceList
      title="Методики"
      itemsLength={methodologies?.length}
      onCreateClick={() => navigate(ROUTES.METHODOLOGY)}
    >
      <MethodologiesTable
        methodologies={methodologies || []}
        isLoading={isMethodologiesLoading}
      />
    </ResourceList>
  );
}

export default MethodologiesPage;
