import { API_TASKS } from "@/constants/apiConstants";
import { ITask, ITaskCreate } from "@/interfaces/task";
import axios from "axios";

export async function getTasks(): Promise<ITask[]> {
  return axios.get(API_TASKS).then(({ data }) => data);
}

export async function getTaskDetails(id: number): Promise<ITask> {
  return axios.get(`${API_TASKS}${id}`).then(({ data }) => data);
}

export async function createTask(data: ITaskCreate): Promise<ITask> {
  return axios.post(API_TASKS, data).then(({ data }) => data);
}

export async function updateTask(
  id: number,
  data: Partial<ITaskCreate>
): Promise<ITask> {
  return axios.patch(`${API_TASKS}${id}`, data).then(({ data }) => data);
}

export async function removeTask(id: number) {
  return axios.delete(`${API_TASKS}${id}`).then(({ data }) => data);
}
