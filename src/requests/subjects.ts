import axios from "axios";
import { API_SUBJECTS } from "../constants/apiConstants";
import { ISubject } from "../interfaces/subject";

export function getSubjects(search?: string): Promise<ISubject[]> {
  return axios
    .get(API_SUBJECTS, {
      params: {
        title: search,
      },
    })
    .then(({ data }) => data);
}

export function createSubject(data: ISubject): Promise<ISubject> {
  return axios.post(API_SUBJECTS, data);
}
