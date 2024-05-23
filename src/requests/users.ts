import { API_STUDENT_PROGRESS, API_USERS } from "@/constants/apiConstants";
import { ICreateUser, IUser, IUserProgress } from "@/interfaces/user";
import { request } from "./request";
import { Role } from "@/interfaces/auth";

export async function getUsers(params?: { role?: Role }): Promise<IUser[]> {
  return request.get(API_USERS, { params }).then(({ data }) => data);
}

export async function getUserDetails(id: number): Promise<IUser> {
  return request.get(`${API_USERS}${id}`).then(({ data }) => data);
}

export async function createUser(data: ICreateUser): Promise<IUser> {
  return request.post(API_USERS, data).then(({ data }) => data);
}

export async function resetPassword(userId: number) {
  return request
    .post(`${API_USERS}${userId}/reset-password`)
    .then(({ data }) => data);
}

export async function updateUser(
  id: number,
  data: Partial<ICreateUser>
): Promise<IUser> {
  return request.patch(`${API_USERS}${id}`, data).then(({ data }) => data);
}

export async function deleteUser(id: number): Promise<IUser> {
  return request.delete(`${API_USERS}${id}`).then(({ data }) => data);
}

export async function getUserProgress(id: number): Promise<IUserProgress> {
  return request.get(API_STUDENT_PROGRESS(id)).then(({ data }) => data);
}
