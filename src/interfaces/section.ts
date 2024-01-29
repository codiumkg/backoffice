import { ISubject } from "./subject";

export interface ISection {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  subjectId: number;
  subject: ISubject;
}

export interface ISectionCreate {
  title: string;
  subjectId: number;
}
