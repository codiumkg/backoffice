import { request } from "./request";
import { API_SUBJECTS } from "../constants/apiConstants";
import { ISubject, ISubjectCreate } from "../interfaces/subject";

export async function getSubjects(search?: string): Promise<ISubject[]> {
  return request
    .get(API_SUBJECTS, {
      params: {
        title: search,
      },
    })
    .then(({ data }) => data);
}

export async function getSubjectDetails(id: number): Promise<ISubject> {
  return request.get(`${API_SUBJECTS}${id}`).then(({ data }) => data);
}

export function createSubject(data: ISubjectCreate): Promise<ISubject> {
  return request.post(API_SUBJECTS, data).then(({ data }) => data);
}

export function updateSubject(
  id: number,
  data: Partial<ISubjectCreate>
): Promise<ISubject> {
  return request.patch(`${API_SUBJECTS}${id}`, data).then(({ data }) => data);
}

export async function removeSubject(id: number) {
  return request.delete(`${API_SUBJECTS}${id}`).then(({ data }) => data);
}
