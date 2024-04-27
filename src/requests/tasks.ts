import { API_TASKS } from "@/constants/apiConstants";
import { ITask, ITaskCreate } from "@/interfaces/task";
import { request } from "./request";

export async function getTasks(): Promise<ITask[]> {
  return request.get(API_TASKS).then(({ data }) => data);
}

export async function getTaskDetails(id: number): Promise<ITask> {
  return request.get(`${API_TASKS}${id}`).then(({ data }) => data);
}

export async function createTask(data: ITaskCreate): Promise<ITask> {
  return request.post(API_TASKS, data).then(({ data }) => data);
}

export async function updateTask(
  id: number,
  data: Partial<ITaskCreate>
): Promise<ITask> {
  return request.patch(`${API_TASKS}${id}`, data).then(({ data }) => data);
}

export async function removeTask(id: number) {
  return request.delete(`${API_TASKS}${id}`).then(({ data }) => data);
}
