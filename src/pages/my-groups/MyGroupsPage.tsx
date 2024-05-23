import { Icons } from "@/components/shared/Icons";
import { ROUTES } from "@/constants/routes";
import { useGroupsQuery } from "@/queries/groups";
import { Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function MyGroupsPage() {
  const navigate = useNavigate();

  const { data: groups, isLoading } = useGroupsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-bgSecondary p-4 rounded-xl">Список моих групп</div>

      {isLoading && (
        <div className="grid place-content-center h-32">
          <Spinner size="lg" />
        </div>
      )}

      <div className="grid grid-cols-2">
        {!isLoading &&
          groups?.map((group) => (
            <div
              key={group.id}
              onClick={() => navigate(ROUTES.GROUP_STUDENTS(group.id))}
              className="p-6 bg-bgSecondary rounded-xl border border-transparent hover:border-highlight"
            >
              <Icons.GROUP className="text-4xl" />
              <h1 className="font-bold">{group.title}</h1>
              <h2 className="text-sm">{group.subject.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
