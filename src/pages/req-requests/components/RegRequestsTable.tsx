import { IRegRequest } from "@/interfaces/regRequest";

import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { useRegRequestDeletion } from "@/queries/reg-requests";
import { useNotification } from "@/hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { columns, renderCell } from "./columns";

interface Props {
  regRequests: IRegRequest[];
  isLoading: boolean;
}

export default function RegRequestsTable({ regRequests, isLoading }: Props) {
  const queryClient = useQueryClient();

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const { mutate: deleteRequest, isPending: isDeleting } =
    useRegRequestDeletion({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REG_REQUESTS] });
        showSuccessNotification("Удалено!");
      },

      onError: () => {
        showErrorNotification();
      },
    });

  return (
    <Table aria-label="Заявки">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={regRequests}
        emptyContent="Нет заявок."
        isLoading={isLoading}
      >
        {(regRequest) => (
          <TableRow key={regRequest.id}>
            {(columnKey) => (
              <TableCell>{renderCell(regRequest, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
