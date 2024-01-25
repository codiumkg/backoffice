import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { DATE_FORMAT } from "@/constants/common";
import { useSubjectsQuery } from "@/queries/subjects";
import dayjs from "dayjs";

function SubjectsPage() {
  const { data: subjects } = useSubjectsQuery({});

  return (
    <ResourceList title="Предметы">
      <Table
        headers={[
          { title: "ID" },
          { title: "Название" },
          { title: "Создан" },
          { title: "Обновлен" },
        ]}
      >
        {subjects?.map((subject) => (
          <TableRow key={subject.id}>
            <TableColumn>{subject.id}</TableColumn>
            <TableColumn>{subject.title}</TableColumn>
            <TableColumn>
              {dayjs(subject.createdAt).format(DATE_FORMAT)}
            </TableColumn>
            <TableColumn>
              {dayjs(subject.updatedAt).format(DATE_FORMAT)}
            </TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default SubjectsPage;
