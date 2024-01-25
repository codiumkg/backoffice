import { ReactNode } from "react";

export interface ITableHeader {
  title: string;
}

export interface ITableRow {
  title: string;
  render: ReactNode;
}
