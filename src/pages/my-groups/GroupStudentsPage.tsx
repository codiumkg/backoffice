import { useGroupStudents } from "@/queries/groups";
import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import StudentsTable from "./StudentsTable";

export default function GroupStudentsPage() {
  const { id } = useParams();

  const { students, isStudentsLoading } = useGroupStudents(+id!);

  return (
    <div>
      {isStudentsLoading && <Spinner />}
      {!isStudentsLoading && <StudentsTable students={students || []} />}
    </div>
  );
}
