import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useLecturesQuery } from "@/queries/lectures";
import { useNavigate } from "react-router-dom";

import LecturesTable from "./LecturesTable";
import { Spinner } from "@nextui-org/react";

function LecturesPage() {
  const { data: lectures, isLoading } = useLecturesQuery();

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Лекции"
      onCreateClick={() => navigate(ROUTES.LECTURE)}
      itemsLength={lectures?.length}
    >
      {isLoading && (
        <div className="p-40">
          <Spinner />
        </div>
      )}
      {!isLoading && <LecturesTable lectures={lectures || []} />}
    </ResourceList>
  );
}

export default LecturesPage;
