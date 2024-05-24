import { ITopic } from "./topic";

export interface IPresentation {
  id: number;
  filePath: string;
  topic: ITopic;
}

export interface IPresentationCreate {
  filePath: string;
  topicId: number;
}
