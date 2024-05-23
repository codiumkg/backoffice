import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";
import { IUser } from "@/interfaces/user";
import StudentProgressModal from "./StudentProgressModal";
import { useState } from "react";

interface Props {
  students: IUser[];
}

export default function StudentsTable({ students }: Props) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const [selectedStudent, setSelectedStudent] = useState<IUser | undefined>();

  const handleRowClick = (student: IUser) => {
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
            <TableRow key={student.id} onClick={() => handleRowClick(student)}>
              {(columnKey) => (
                <TableCell>{renderCell(student, columnKey)}</TableCell>
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
