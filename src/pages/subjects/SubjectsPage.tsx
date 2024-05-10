import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useSubjectsQuery } from "@/queries/subjects";
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

function SubjectsPage() {
  const { data: subjects, isLoading } = useSubjectsQuery({});

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Предметы"
      onCreateClick={() => navigate(ROUTES.SUBJECT)}
      itemsLength={subjects?.length}
    >
      {isLoading && (
        <div className="p-40">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <Table aria-label="Предметы">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={subjects || []}
            emptyContent="Нет предметов."
            isLoading={isLoading}
          >
            {(subject) => (
              <TableRow
                key={subject.id}
                onClick={() => navigate(`${ROUTES.SUBJECT}/${subject.id}`)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(subject, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </ResourceList>
  );
}

export default SubjectsPage;
