import { API_PRESENTATIONS } from "@/constants/apiConstants";
import { request } from "./request";
import { IPresentation, IPresentationCreate } from "@/interfaces/presentation";

export async function getPresentations(): Promise<IPresentation[]> {
  return request.get(API_PRESENTATIONS).then(({ data }) => data);
}

export async function getPresentationDetails(
  id: number
): Promise<IPresentation> {
  return request.get(`${API_PRESENTATIONS}/${id}`).then(({ data }) => data);
}

export async function createPresentation(
  data: IPresentationCreate
): Promise<IPresentation> {
  return request.post(API_PRESENTATIONS, data).then(({ data }) => data);
}

export async function updatePresentation(
  id: number,
  data: Partial<IPresentationCreate>
): Promise<IPresentation> {
  return request
    .patch(`${API_PRESENTATIONS}/${id}`, data)
    .then(({ data }) => data);
}

export async function deletePresentation(id: number) {
  return request.delete(`${API_PRESENTATIONS}/${id}`).then(({ data }) => data);
}
