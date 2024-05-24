import { IMethodology } from "@/interfaces/methodology";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "filePath", label: "Ссылка на файл" },
  { key: "topic", label: "Топик" },
];

export const renderCell = (methodology: IMethodology, columnKey: React.Key) => {
  const cellValue = methodology[columnKey as keyof IMethodology];

  switch (columnKey) {
    case "topic":
      return methodology.topic.title;
    default:
      return cellValue as string;
  }
};
