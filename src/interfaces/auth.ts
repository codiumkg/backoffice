import { IGroup } from "./group";

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

export interface IUserData {
  id: number;
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

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
