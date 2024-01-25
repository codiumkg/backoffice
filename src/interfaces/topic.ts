import { ISection } from "./section";

export interface ITopic {
  id: number;
  title: string;
  sectionId: number;
  section: ISection;
  createdAt: string;
  updatedAt: string;
}
