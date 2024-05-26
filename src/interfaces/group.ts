import { ISubject } from "./subject";
import { IUser } from "./user";

export interface IGroup {
  id: number;
  title: string;
  subject: ISubject;
  teacher: IUser;
}

export interface IGroupCreate {
  title: string;
  subjectId: number;
  teacherId: number;
}

export interface IGroupFilters {
  search?: string | null;
  teacherId?: number | null;
}
