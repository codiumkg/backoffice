import { Role } from "./auth";
import { IGroup } from "./group";
import { ILecture } from "./lecture";
import { ITask } from "./task";
import { ITopicContent } from "./topicContent";

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

export interface IUserProgress {
  percent: number;
  completedLectures: ILecture[];
  completedTasks: ITask[];
}
