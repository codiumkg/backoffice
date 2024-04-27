import { API_TOPIC_CONTENT } from "@/constants/apiConstants";
import { ITopicContent, ITopicContentCreate } from "@/interfaces/topicContent";
import { request } from "./request";

export async function getTopicContent(): Promise<ITopicContent[]> {
  return request.get(API_TOPIC_CONTENT).then(({ data }) => data);
}

export async function getTopicContentDetails(
  id: number
): Promise<ITopicContent> {
  return request.get(`${API_TOPIC_CONTENT}${id}`).then(({ data }) => data);
}

export async function updateTopicContent(
  id: number,
  data: Partial<ITopicContentCreate>
) {
  return request
    .patch(`${API_TOPIC_CONTENT}${id}`, data)
    .then(({ data }) => data);
}

export async function removeTopicContent(id: number) {
  return request.delete(`${API_TOPIC_CONTENT}${id}`).then(({ data }) => data);
}
