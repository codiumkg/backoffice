import { IGroup, Role } from "./auth";

export interface IUser {
  id: number;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  role: Role;
  group?: IGroup;
  groupId?: number;
  profile?: IProfile;
}

export interface IProfile {
  id: number;
  firstName?: string;
  lastName?: string;
  age?: number;
  image?: string;
  bio?: string;
  userId: number;
}

export interface ICreateUser {
  username: string;
  email?: string;
  phone?: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  bio?: string;
  image?: string;
  age?: number;
  groupId?: number;
}
