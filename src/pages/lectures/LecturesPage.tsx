import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useLecturesQuery } from "@/queries/lectures";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";

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
      {!isLoading && (
        <Table aria-label="Заявки">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={lectures || []}
            emptyContent="Нет заявок."
            isLoading={isLoading}
          >
            {(lecture) => (
              <TableRow
                key={lecture.id}
                onClick={() => navigate(`${ROUTES.LECTURE}/${lecture.id}`)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(lecture, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </ResourceList>
  );
}

export default LecturesPage;
