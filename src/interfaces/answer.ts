import { ITask } from "./task";

export interface IAnswer {
  id: number;
  text: string;
  isCorrectAnswer: boolean;
  taskId: number;
  task: ITask;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAnswer {
  text: string;
  isCorrectAnswer: boolean;
}
