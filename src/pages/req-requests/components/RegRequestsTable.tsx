import { IRegRequest } from "@/interfaces/regRequest";
import Table, { TableRow, TableColumn } from "@/components/shared/Table/Table";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";

interface Props {
  regRequests: IRegRequest[];
}

export default function RegRequestsTable({ regRequests }: Props) {
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
        <TableRow key={request.id}>
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
