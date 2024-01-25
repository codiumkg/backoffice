import axios from "axios";
import { API_GROUPS } from "../constants/apiConstants";
import { IGroup } from "../interfaces/auth";
import { IGroupCreate } from "../interfaces/group";

export function getGroups(): Promise<IGroup[]> {
  return axios.get(API_GROUPS).then(({ data }) => data);
}

export function createGroup(data: IGroupCreate): Promise<IGroup> {
  return axios.post(API_GROUPS, data).then(({ data }) => data);
}
