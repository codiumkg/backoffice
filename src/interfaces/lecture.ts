import { ITopic } from "./topic";

export interface ILecture {
  id: number;
  title: string;
  content: string;
  image: string | null;
  topicId: number;
  topic: ITopic;
  createdAt: string;
  updatedAt: string;
}

export interface ILectureCreate {
  title: string;
  content: string;
  image?: string | null;
  topicId: number;
}

export interface ILectureFilters {
  search?: string | null;
  topicId?: number | null;
}
