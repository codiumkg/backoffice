import { API_TOPIC_CONTENT } from "@/constants/apiConstants";
import { ITopicContent, ITopicContentCreate } from "@/interfaces/topicContent";
import axios from "axios";

export async function getTopicContent(): Promise<ITopicContent[]> {
  return axios.get(API_TOPIC_CONTENT).then(({ data }) => data);
}

export async function getTopicContentDetails(
  id: number
): Promise<ITopicContent> {
  return axios.get(`${API_TOPIC_CONTENT}${id}`).then(({ data }) => data);
}

export async function updateTopicContent(
  id: number,
  data: Partial<ITopicContentCreate>
) {
  return axios
    .patch(`${API_TOPIC_CONTENT}${id}`, data)
    .then(({ data }) => data);
}

export async function removeTopicContent(id: number) {
  return axios.delete(`${API_TOPIC_CONTENT}${id}`).then(({ data }) => data);
}
