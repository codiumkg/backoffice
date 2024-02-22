import { TopicContentType } from "@/constants/common";
import { ITask } from "./task";
import { ILecture } from "./lecture";
import { ITopic } from "./topic";

export interface ITopicContent {
  id: number;
  type: TopicContentType;
  orderNumber: number;
  taskId?: number;
  lectureId?: number;
  task?: ITask;
  lecture?: ILecture;
  topicId: number;
  topic: ITopic;
}

export interface ITopicContentCreate {
  type: TopicContentType;
  orderNumber: number;
  taskId?: number;
  lectureId?: number;
  topicId: number;
}
