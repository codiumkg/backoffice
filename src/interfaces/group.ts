import { ISubject } from "./subject";

export interface IGroup {
  id: number;
  title: string;
  subject: ISubject;
}

export interface IGroupCreate {
  title: string;
  subjectId: number;
}
