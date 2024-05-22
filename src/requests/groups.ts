import { request } from "./request";
import { API_GROUPS } from "../constants/apiConstants";
import { IGroup, IGroupCreate } from "../interfaces/group";

export async function getGroups(): Promise<IGroup[]> {
  return request.get(API_GROUPS).then(({ data }) => data);
}

export async function getGroupDetails(id: number) {
  return request.get(`${API_GROUPS}${id}`).then(({ data }) => data);
}

export async function createGroup(data: IGroupCreate): Promise<IGroup> {
  return request.post(API_GROUPS, data).then(({ data }) => data);
}

export async function updateGroup(
  id: number,
  data: Partial<IGroupCreate>
): Promise<IGroup> {
  return request.patch(`${API_GROUPS}${id}`, data).then(({ data }) => data);
}

export async function removeGroup(id: number) {
  return request.delete(`${API_GROUPS}${id}`).then(({ data }) => data);
}
