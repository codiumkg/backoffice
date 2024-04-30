import { DATE_FORMAT } from "@/constants/common";
import { ISubject } from "@/interfaces/subject";
import dayjs from "dayjs";
import React from "react";

export const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Название" },
  { key: "createdAt", label: "Создан" },
  { key: "updatedAt", label: "Обновлен" },
];

export const renderCell = (subject: ISubject, columnKey: React.Key) => {
  const cellValue = subject[columnKey as keyof ISubject];

  switch (columnKey) {
    case "createdAt":
    case "updatedAt":
      return dayjs(cellValue).format(DATE_FORMAT);
    default:
      return cellValue;
  }
};
