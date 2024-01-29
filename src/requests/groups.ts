import axios from "axios";
import { API_GROUPS } from "../constants/apiConstants";
import { IGroup } from "../interfaces/auth";
import { IGroupCreate } from "../interfaces/group";

export async function getGroups(): Promise<IGroup[]> {
  return axios.get(API_GROUPS).then(({ data }) => data);
}

export async function createGroup(data: IGroupCreate): Promise<IGroup> {
  return axios.post(API_GROUPS, data).then(({ data }) => data);
}

export async function removeGroup(id: number) {
  return axios.delete(`${API_GROUPS}${id}`).then(({ data }) => data);
}
