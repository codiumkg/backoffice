import { ISection } from "../interfaces/section";
import { API_SECTIONS } from "../constants/apiConstants";
import axios from "axios";

export function getSections() {
  return axios.get<ISection[]>(API_SECTIONS).then(({ data }) => data);
}

export function createSection(data: ISection) {
  return axios.post<ISection>(API_SECTIONS, data).then(({ data }) => data);
}
