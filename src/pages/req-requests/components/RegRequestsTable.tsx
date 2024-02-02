import { IRegRequest } from "@/interfaces/regRequest";
import Table, { TableRow, TableColumn } from "@/components/shared/Table/Table";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import { useRegRequestDeletion } from "@/queries/reg-requests";
import { useNotification } from "@/hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

interface Props {
  regRequests: IRegRequest[];
}

export default function RegRequestsTable({ regRequests }: Props) {
  const queryClient = useQueryClient();

  const { showErrorNotification, showSuccessNotification } = useNotification();

  const { mutate, isPending } = useRegRequestDeletion({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REG_REQUESTS] });
      showSuccessNotification("Удалено!");
    },

    onError: () => {
      showErrorNotification();
    },
  });

  return (
    <Table
      headers={[
        { title: "ID" },
        { title: "Ф.И.О" },
        { title: "Телефон" },
        { title: "Возраст" },
        { title: "Создан" },
      ]}
    >
      {regRequests.map((request) => (
        <TableRow
          key={request.id}
          onDelete={() => mutate(request.id)}
          isDeleting={isPending}
        >
          <TableColumn>{request.id}</TableColumn>
          <TableColumn>{request.name}</TableColumn>
          <TableColumn>{request.phone}</TableColumn>
          <TableColumn>{request.age}</TableColumn>
          <TableColumn>
            {dayjs(request.createdAt).format(DATE_FORMAT)}
          </TableColumn>
        </TableRow>
      ))}
    </Table>
  );
}
