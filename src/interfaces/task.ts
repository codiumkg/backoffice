import { IAnswer, ICreateAnswer } from "./answer";
import { ITopic } from "./topic";

export interface ITask {
  id: number;
  text: string;
  image?: string;
  tip?: string;
  topicId: number;
  topic: ITopic;
  answers: IAnswer[];
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCreate {
  text: string;
  image?: string;
  tip?: string;
  topicId: number;
  answers: ICreateAnswer[];
}
