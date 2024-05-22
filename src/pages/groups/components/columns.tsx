import { IGroup } from "@/interfaces/group";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Название" },
  { key: "subject", label: "Предмет" },
  { key: "teacher", label: "Преподаватель" },
  //   { key: "createdAt", label: "Создан" },
];

export const renderCell = (group: IGroup, columnKey: React.Key) => {
  const cellValue = group[columnKey as keyof IGroup];

  switch (columnKey) {
    case "subject":
      return group.subject.title;
    case "teacher":
      return group.teacher.username;
    default:
      return cellValue as string;
  }
};
