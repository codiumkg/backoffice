import { IGroup } from "@/interfaces/auth";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Название" },
  { key: "subject", label: "Предмет" },
  //   { key: "createdAt", label: "Создан" },
];

export const renderCell = (group: IGroup, columnKey: React.Key) => {
  const cellValue = group[columnKey as keyof IGroup];

  switch (columnKey) {
    case "subject":
      return group.subject.title;
    default:
      return cellValue;
  }
};
