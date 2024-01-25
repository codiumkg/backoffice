import { ILecture } from "../interfaces/lecture";
import { API_LECTURES } from "../constants/apiConstants";
import axios from "axios";

export function getLectures(id?: number): Promise<ILecture[]> {
  if (id) {
    return axios.get(`${API_LECTURES}/${id}`).then(({ data }) => data);
  }

  return axios.get(API_LECTURES).then(({ data }) => data);
}

export function createLecture(data: ILecture) {
  return axios.post<ILecture>(API_LECTURES, data).then(({ data }) => data);
}
