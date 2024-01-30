import { ISection, ISectionCreate } from "../interfaces/section";
import { API_SECTIONS } from "../constants/apiConstants";
import axios from "axios";

export async function getSections(search?: string): Promise<ISection[]> {
  return axios
    .get(API_SECTIONS, {
      params: {
        title: search,
      },
    })
    .then(({ data }) => data);
}

export async function getSectionDetails(id: number): Promise<ISection> {
  return axios.get(`${API_SECTIONS}${id}`).then(({ data }) => data);
}

export async function createSection(data: ISectionCreate): Promise<ISection> {
  return axios.post(API_SECTIONS, data).then(({ data }) => data);
}

export async function updateSection(
  id: number,
  data: Partial<ISectionCreate>
): Promise<ISection> {
  return axios.patch(`${API_SECTIONS}${id}`, data).then(({ data }) => data);
}

export async function removeSection(id: number) {
  return axios.delete(`${API_SECTIONS}${id}`).then(({ data }) => data);
}
