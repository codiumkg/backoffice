import { API_METHODOLOGIES } from "@/constants/apiConstants";
import { request } from "./request";
import {
  IMethodology,
  IMethodologyCreate,
  IMethodologyFilters,
} from "@/interfaces/methodology";

export async function getMethodologies(
  filters?: IMethodologyFilters
): Promise<IMethodology[]> {
  return request
    .get(API_METHODOLOGIES, {
      params: {
        ...(filters?.topicId && { topicId: filters.topicId }),
      },
    })
    .then(({ data }) => data);
}

export async function getMethodologyDetails(id: number): Promise<IMethodology> {
  return request.get(`${API_METHODOLOGIES}/${id}`).then(({ data }) => data);
}

export async function createMethodology(
  data: IMethodologyCreate
): Promise<IMethodology> {
  return request.post(API_METHODOLOGIES, data).then(({ data }) => data);
}

export async function updateMethodology(
  id: number,
  data: Partial<IMethodologyCreate>
): Promise<IMethodology> {
  return request
    .patch(`${API_METHODOLOGIES}/${id}`, data)
    .then(({ data }) => data);
}

export async function deleteMethodology(id: number) {
  return request.delete(`${API_METHODOLOGIES}/${id}`).then(({ data }) => data);
}
