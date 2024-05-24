import { ITopic } from "./topic";

export interface IMethodology {
  id: number;
  filePath: string;
  topic: ITopic;
}

export interface IMethodologyCreate {
  filePath: string;
  topicId: number;
}
