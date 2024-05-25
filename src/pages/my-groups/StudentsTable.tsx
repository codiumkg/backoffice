import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { IUser } from "@/interfaces/user";
import StudentProgressModal from "./StudentProgressModal";
import { Key, useState } from "react";
import { useTaskUserAnswers } from "@/queries/tasks";
import { Icons } from "@/components/shared/Icons";

interface Props {
  students: IUser[];
}

const columns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Логин" },
  { key: "firstName", label: "Имя" },
  { key: "lastName", label: "Фамилия" },
  { key: "actions", label: "Действия" },
];

export default function StudentsTable({ students }: Props) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const [selectedStudent, setSelectedStudent] = useState<IUser | undefined>();

  const { userAnswers, isUserAnswersLoading } = useTaskUserAnswers(
    selectedStudent?.id,
    !!selectedStudent
  );

  const handleShowProgress = (student: IUser) => {
    setSelectedStudent(student);
    onOpen();
  };

  return (
    <>
      <Table aria-label="Студенты">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={students || []} emptyContent="Нет студентов.">
          {(student) => (
            <TableRow key={student.id}>
              {(columnKey) => (
                <TableCell>
                  <StudentRow
                    user={student}
                    columnKey={columnKey}
                    onShowProgress={() => handleShowProgress(student)}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedStudent && (
        <StudentProgressModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          student={selectedStudent}
        />
      )}
    </>
  );
}

function StudentRow({
  user,
  columnKey,
  onShowProgress,
}: {
  user: IUser;
  columnKey: Key;
  onShowProgress: () => void;
}) {
  const cellValue = user[columnKey as keyof IUser];

  switch (columnKey) {
    case "firstName":
      return user.profile?.firstName;
    case "lastName":
      return user.profile?.lastName;
    case "actions":
      return (
        <div className="flex gap-4">
          <Tooltip content="Статистика успеваемости студента">
            <span className="text-xl cursor-pointer" onClick={onShowProgress}>
              <Icons.PRESENTATION_CHART />
            </span>
          </Tooltip>

          <Tooltip content="Результаты задач студента">
            <span className="text-xl cursor-pointer">
              <Icons.TASKS_LIST />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue as string;
  }
}
