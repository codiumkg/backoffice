import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useSectionsQuery } from "@/queries/sections";
import { useNavigate, useSearchParams } from "react-router-dom";
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

function SectionsPage() {
  const [searchParams] = useSearchParams();

  const { data: sections, isPending } = useSectionsQuery({
    filters: { search: searchParams.get("search") },
  });

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Разделы"
      onCreateClick={() => navigate(ROUTES.SECTION)}
      itemsLength={sections?.length}
      withSearch
    >
      {isPending && (
        <div className="p-40">
          <Spinner />
        </div>
      )}
      {!isPending && (
        <Table aria-label="Предметы">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={sections || []}
            emptyContent="Нет разделов."
            isLoading={isPending}
          >
            {(section) => (
              <TableRow
                key={section.id}
                onClick={() => navigate(`${ROUTES.SECTION}/${section.id}`)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(section, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </ResourceList>
  );
}

export default SectionsPage;
