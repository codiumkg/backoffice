import { ITopic } from "./topic";

export interface ILecture {
  id: number;
  title: string;
  content: string;
  number: number;
  image: string | null;
  topicId: number;
  topic: ITopic;
  createdAt: string;
  updatedAt: string;
}
