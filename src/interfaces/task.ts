import { IAnswer, ICreateAnswer } from "./answer";
import { ITopic } from "./topic";
import { IUser } from "./user";

export interface ITask {
  id: number;
  text: string;
  image?: string;
  tip?: string;
  topicId: number;
  topic: ITopic;
  answers: IAnswer[];
  correctAnswerExplanation: string | null;
  isUserAnswer: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCreate {
  text: string;
  image?: string;
  tip?: string;
  topicId: number;
  correctAnswerExplanation: string;
  answers: ICreateAnswer[];
  isUserAnswer: boolean;
}

export interface ITaskUserAnswer {
  id: number;
  text: string;
  answer?: IAnswer;
  user: IUser;
  task: ITask;
  createdAt: string;
  updatedAt: string;
}
