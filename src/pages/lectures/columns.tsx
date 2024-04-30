import { DATE_FORMAT } from "@/constants/common";
import { ILecture } from "@/interfaces/lecture";
import dayjs from "dayjs";

export const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Название" },
  { key: "topic", label: "Топик" },
  { key: "createdAt", label: "Создан" },
  { key: "updatedAt", label: "Обновлен" },
];

export const renderCell = (lecture: ILecture, columnKey: React.Key) => {
  const cellValue = lecture[columnKey as keyof ILecture];

  switch (columnKey) {
    case "topic":
      return lecture.topic.title;
    case "createdAt":
    case "updatedAt":
      return dayjs(cellValue as string).format(DATE_FORMAT);
    default:
      return cellValue as string;
  }
};
