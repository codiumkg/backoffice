import { ISection } from "@/interfaces/section";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Название" },
  { key: "subject", label: "Предмет" },
];

export const renderCell = (section: ISection, columnKey: React.Key) => {
  const cellValue = section[columnKey as keyof ISection];

  switch (columnKey) {
    case "subject":
      return section.subject.title;
    default:
      return cellValue as string;
  }
};
