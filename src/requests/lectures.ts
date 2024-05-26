import {
  ILecture,
  ILectureCreate,
  ILectureFilters,
} from "../interfaces/lecture";
import { API_LECTURES } from "../constants/apiConstants";
import { request } from "./request";

export async function getLectures(
  filters?: ILectureFilters
): Promise<ILecture[]> {
  return request
    .get(API_LECTURES, {
      params: {
        ...(filters?.search && { search: filters.search }),
        ...(filters?.topicId && { topicId: filters.topicId }),
      },
    })
    .then(({ data }) => data);
}

export async function getLectureDetails(id: number): Promise<ILecture> {
  return request.get(`${API_LECTURES}${id}`).then(({ data }) => data);
}

export async function createLecture(data: ILectureCreate): Promise<ILecture> {
  return request.post(API_LECTURES, data).then(({ data }) => data);
}

export async function updateLecture(
  id: number,
  data: Partial<ILectureCreate>
): Promise<ILecture> {
  return request.patch(`${API_LECTURES}${id}`, data).then(({ data }) => data);
}

export async function removeLecture(id: number) {
  return request.delete(`${API_LECTURES}${id}`).then(({ data }) => data);
}
