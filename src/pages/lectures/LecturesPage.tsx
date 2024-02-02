import ResourceList from "@/components/shared/ResourceList/ResourceList";
import Table, { TableColumn, TableRow } from "@/components/shared/Table/Table";
import { DATE_FORMAT } from "@/constants/common";
import { ROUTES } from "@/constants/routes";
import { useLecturesQuery } from "@/queries/lectures";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function LecturesPage() {
  const { data: lectures, isLoading } = useLecturesQuery();

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Лекции"
      isLoading={isLoading}
      onCreateClick={() => navigate(ROUTES.LECTURE)}
      itemsLength={lectures?.length}
    >
      <Table
        headers={[
          { title: "ID" },
          { title: "Название" },
          { title: "Номер" },
          { title: "Топик" },
          { title: "Создан" },
          { title: "Обновлен" },
        ]}
      >
        {lectures?.map((lecture) => (
          <TableRow
            key={lecture.id}
            onClick={() => navigate(`${ROUTES.LECTURE}/${lecture.id}`)}
          >
            <TableColumn>{lecture.id}</TableColumn>
            <TableColumn>{lecture.title}</TableColumn>
            <TableColumn>{lecture.number}</TableColumn>
            <TableColumn>{lecture.topic.title}</TableColumn>
            <TableColumn>
              {dayjs(lecture.createdAt).format(DATE_FORMAT)}
            </TableColumn>
            <TableColumn>
              {dayjs(lecture.updatedAt).format(DATE_FORMAT)}
            </TableColumn>
          </TableRow>
        ))}
      </Table>
    </ResourceList>
  );
}

export default LecturesPage;
