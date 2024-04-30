import ResourceList from "@/components/shared/ResourceList/ResourceList";
import { ROUTES } from "@/constants/routes";
import { useSectionsQuery } from "@/queries/sections";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { columns, renderCell } from "./columns";

function SectionsPage() {
  const { data: sections, isPending } = useSectionsQuery({});

  const navigate = useNavigate();

  return (
    <ResourceList
      title="Разделы"
      onCreateClick={() => navigate(ROUTES.SECTION)}
      itemsLength={sections?.length}
    >
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
    </ResourceList>
  );
}

export default SectionsPage;
