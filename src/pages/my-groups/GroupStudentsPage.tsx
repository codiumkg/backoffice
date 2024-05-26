import { useGroupStudents } from "@/queries/groups";
import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import StudentsTable from "./StudentsTable";

export default function GroupStudentsPage() {
  const { id } = useParams();

  const { students, isStudentsLoading } = useGroupStudents(+id!);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold">Список студентов группы</h1>
      {isStudentsLoading && (
        <div className="py-20">
          <Spinner />
        </div>
      )}
      {!isStudentsLoading && <StudentsTable students={students || []} />}
    </div>
  );
}
