import { ISubject } from "./subject";

export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  MANAGER = "MANAGER",
  TEACHER = "TEACHER",
}
export interface ILogin {
  username: string;
  password: string;
}

export interface IGroup {
  id: number;
  title: string;
  subject: ISubject;
}

export interface IUserData {
  username: string;
  role: Role;
  group: IGroup;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: Role;
    group: IGroup;
  };
}
