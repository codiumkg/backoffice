import axios from "axios";
import { API_SUBJECTS } from "../constants/apiConstants";
import { ISubject, ISubjectCreate } from "../interfaces/subject";

export async function getSubjects(search?: string): Promise<ISubject[]> {
  return axios
    .get(API_SUBJECTS, {
      params: {
        title: search,
      },
    })
    .then(({ data }) => data);
}

export function createSubject(data: ISubjectCreate): Promise<ISubject> {
  return axios.post(API_SUBJECTS, data).then(({ data }) => data);
}

export async function removeSubject(id: number) {
  return axios.delete(`${API_SUBJECTS}${id}`).then(({ data }) => data);
}
