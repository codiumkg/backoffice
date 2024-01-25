import { ITopic } from "../interfaces/topic";
import { API_TOPICS } from "../constants/apiConstants";
import axios from "axios";

export function getTopics() {
  return axios.get<ITopic[]>(API_TOPICS).then(({ data }) => data);
}

export function createTopic(data: ITopic) {
  return axios.post<ITopic>(API_TOPICS, data).then(({ data }) => data);
}
