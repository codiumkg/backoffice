import { ISection } from "./section";

export interface ITopic {
  id: number;
  title: string;
  sectionId: number;
  section: ISection;
  createdAt: string;
  updatedAt: string;
}

export interface ITopicCreate {
  title: string;
  sectionId: number;
}

export interface IReorderTopicContent {
  topicContentIds: number[];
}
