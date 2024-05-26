import ResourceList from "@/components/shared/ResourceList/ResourceList";
import PresentationsTable from "./components/PresentationsTable";
import { usePresentations } from "@/queries/presentations";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function PresentationsPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { presentations, isPresentationsLoading } = usePresentations({
    topicId: Number(searchParams.get("topicId")),
  });

  return (
    <ResourceList
      title="Презентации"
      itemsLength={presentations?.length}
      onCreateClick={() => navigate(ROUTES.PRESENTATION)}
    >
      <PresentationsTable
        presentations={presentations || []}
        isLoading={isPresentationsLoading}
      />
    </ResourceList>
  );
}

export default PresentationsPage;
