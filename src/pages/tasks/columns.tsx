import { ITask } from "@/interfaces/task";
import React from "react";
import { cleanHtml } from "@/utils/utils";

export const columns = [
  { key: "id", label: "ID" },
  { key: "text", label: "Содержимое" },
  { key: "topic", label: "Топик" },
];

export const renderCell = (task: ITask, columnKey: React.Key) => {
  const cellValue = task[columnKey as keyof ITask];

  switch (columnKey) {
    case "topic":
      return task.topic.title;
    case "text":
      return cleanHtml(task.text);
    default:
      return cellValue as string;
  }
};
