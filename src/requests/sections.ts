import { ISection, ISectionCreate } from "../interfaces/section";
import { API_SECTIONS } from "../constants/apiConstants";
import axios from "axios";

export async function getSections(): Promise<ISection[]> {
  return axios.get(API_SECTIONS).then(({ data }) => data);
}

export async function createSection(data: ISectionCreate): Promise<ISection> {
  return axios.post(API_SECTIONS, data).then(({ data }) => data);
}
