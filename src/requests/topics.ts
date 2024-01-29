import { ITopic, ITopicCreate } from "../interfaces/topic";
import { API_TOPICS } from "../constants/apiConstants";
import axios from "axios";

export async function getTopics(search?: string): Promise<ITopic[]> {
  return axios
    .get(API_TOPICS, {
      params: {
        title: search,
      },
    })
    .then(({ data }) => data);
}

export async function createTopic(data: ITopicCreate): Promise<ITopic> {
  return axios.post(API_TOPICS, data).then(({ data }) => data);
}

export async function removeTopic(id: number) {
  return axios.delete(`${API_TOPICS}${id}`).then(({ data }) => data);
}
