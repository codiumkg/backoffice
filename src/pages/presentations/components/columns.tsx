import { IPresentation } from "@/interfaces/presentation";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "filePath", label: "Ссылка на файл" },
  { key: "topic", label: "Топик" },
];

export const renderCell = (
  presentation: IPresentation,
  columnKey: React.Key
) => {
  const cellValue = presentation[columnKey as keyof IPresentation];

  switch (columnKey) {
    case "topic":
      return presentation.topic.title;
    default:
      return cellValue as string;
  }
};
