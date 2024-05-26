import {
  ISection,
  ISectionCreate,
  ISectionFilters,
} from "../interfaces/section";
import { API_SECTIONS } from "../constants/apiConstants";
import { request } from "./request";

export async function getSections(
  filters?: ISectionFilters
): Promise<ISection[]> {
  return request
    .get(API_SECTIONS, {
      params: {
        ...(filters?.search && { search: filters.search }),
        ...(filters?.subjectId && { subjectId: filters.subjectId }),
      },
    })
    .then(({ data }) => data);
}

export async function getSectionDetails(id: number): Promise<ISection> {
  return request.get(`${API_SECTIONS}${id}`).then(({ data }) => data);
}

export async function createSection(data: ISectionCreate): Promise<ISection> {
  return request.post(API_SECTIONS, data).then(({ data }) => data);
}

export async function updateSection(
  id: number,
  data: Partial<ISectionCreate>
): Promise<ISection> {
  return request.patch(`${API_SECTIONS}${id}`, data).then(({ data }) => data);
}

export async function removeSection(id: number) {
  return request.delete(`${API_SECTIONS}${id}`).then(({ data }) => data);
}
