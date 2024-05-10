import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useTopicsQuery } from "@/queries/topics";
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

function TopicsPage() {
  const { data: topics, isLoading } = useTopicsQuery({});

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Топики"
      onCreateClick={() => navigate(ROUTES.TOPIC)}
      itemsLength={topics?.length}
    >
      {isLoading && (
        <div className="p-40">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <Table aria-label="Топики">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={topics || []}
            emptyContent="Нет заявок."
            isLoading={isLoading}
          >
            {(topic) => (
              <TableRow
                key={topic.id}
                onClick={() => navigate(`${ROUTES.TOPIC}/${topic.id}`)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(topic, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </ResourceList>
  );
}

export default TopicsPage;
