import {
  IReorderTopicContent,
  ITopic,
  ITopicCreate,
  ITopicFilters,
} from "../interfaces/topic";
import { API_TOPICS } from "../constants/apiConstants";
import { request } from "./request";
import { ITopicContent } from "@/interfaces/topicContent";

export async function getTopics(filters?: ITopicFilters): Promise<ITopic[]> {
  return request
    .get(API_TOPICS, {
      params: {
        ...(filters?.search && { search: filters.search }),
        ...(filters?.sectionId && { sectionId: filters.sectionId }),
      },
    })
    .then(({ data }) => data);
}

export async function getTopicDetails(id: number) {
  return request.get(`${API_TOPICS}${id}`).then(({ data }) => data);
}

export async function createTopic(data: ITopicCreate): Promise<ITopic> {
  return request.post(API_TOPICS, data).then(({ data }) => data);
}

export async function updateTopic(
  id: number,
  data: Partial<ITopicCreate>
): Promise<ITopic> {
  return request.patch(`${API_TOPICS}${id}`, data).then(({ data }) => data);
}

export async function removeTopic(id: number) {
  return request.delete(`${API_TOPICS}${id}`).then(({ data }) => data);
}

export async function getTopicContent(id: number): Promise<ITopicContent[]> {
  return request
    .get(`${API_TOPICS}${id}/get-content/`)
    .then(({ data }) => data);
}

export async function reorderTopicContent(
  id: number,
  data: IReorderTopicContent
) {
  return request
    .post(`${API_TOPICS}${id}/update_content_order/`, data)
    .then(({ data }) => data);
}
