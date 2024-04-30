import { DATE_FORMAT } from "@/constants/common";
import { IRegRequest } from "@/interfaces/regRequest";
import dayjs from "dayjs";
import React from "react";

export const columns = [
  { key: "name", label: "Ф.И.О" },
  { key: "phone", label: "Телефон" },
  { key: "age", label: "Возраст" },
  { key: "createdAt", label: "Создан" },
];

export const renderCell = (regRequest: IRegRequest, columnKey: React.Key) => {
  const cellValue = regRequest[columnKey as keyof IRegRequest];

  switch (columnKey) {
    case "createdAt":
      return dayjs(cellValue).format(DATE_FORMAT);
    default:
      return cellValue;
  }
};
