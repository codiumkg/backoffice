import { ITopic, ITopicCreate } from "../interfaces/topic";
import { API_TOPICS } from "../constants/apiConstants";
import { request } from "./request";

export async function getTopics(search?: string): Promise<ITopic[]> {
  return request
    .get(API_TOPICS, {
      params: {
        title: search,
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
