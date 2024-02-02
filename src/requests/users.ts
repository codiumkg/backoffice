import { API_USERS } from "@/constants/apiConstants";
import { ICreateUser, IUser } from "@/interfaces/user";
import axios from "axios";

export async function getUsers(): Promise<IUser[]> {
  return axios.get(API_USERS).then(({ data }) => data);
}

export async function getUserDetails(id: number): Promise<IUser> {
  return axios.get(`${API_USERS}${id}`).then(({ data }) => data);
}

export async function createUser(data: ICreateUser): Promise<IUser> {
  return axios.post(API_USERS, data).then(({ data }) => data);
}

export async function deleteUser(id: number): Promise<IUser> {
  return axios.delete(`${API_USERS}${id}`).then(({ data }) => data);
}
