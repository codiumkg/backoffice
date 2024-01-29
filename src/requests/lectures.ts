import { ILecture, ILectureCreate } from "../interfaces/lecture";
import { API_LECTURES } from "../constants/apiConstants";
import axios from "axios";

export async function getLectures(id?: number): Promise<ILecture[]> {
  if (id) {
    return axios.get(`${API_LECTURES}/${id}`).then(({ data }) => data);
  }

  return axios.get(API_LECTURES).then(({ data }) => data);
}

export async function createLecture(data: ILectureCreate) {
  return axios.post(API_LECTURES, data).then(({ data }) => data);
}

export async function removeLecture(id: number) {
  return axios.delete(`${API_LECTURES}${id}`).then(({ data }) => data);
}
