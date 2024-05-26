import { request } from "./request";
import { API_GROUP_STUDENTS, API_GROUPS } from "../constants/apiConstants";
import { IGroup, IGroupCreate, IGroupFilters } from "../interfaces/group";
import { IUser } from "@/interfaces/user";

export async function getGroups(filters?: IGroupFilters): Promise<IGroup[]> {
  return request
    .get(API_GROUPS, {
      params: { teacherId: filters?.teacherId, search: filters?.search },
    })
    .then(({ data }) => data);
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

export async function getGroupStudents(groupId: number): Promise<IUser[]> {
  return request
    .get(API_GROUP_STUDENTS(groupId))
    .then(({ data }) => data.students);
}
