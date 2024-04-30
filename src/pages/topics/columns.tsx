import { ITopic } from "@/interfaces/topic";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Название" },
  { key: "section", label: "Раздел" },
];

export const renderCell = (topic: ITopic, columnKey: React.Key) => {
  const cellValue = topic[columnKey as keyof ITopic];

  switch (columnKey) {
    case "section":
      return topic.section.title;
    default:
      return cellValue as string;
  }
};
