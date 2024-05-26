import { API_GET_USER_ANSWERS, API_TASKS } from "@/constants/apiConstants";
import {
  ITask,
  ITaskCreate,
  ITaskFilters,
  ITaskUserAnswer,
} from "@/interfaces/task";
import { request } from "./request";

export async function getTasks(filters?: ITaskFilters): Promise<ITask[]> {
  return request
    .get(API_TASKS, {
      params: {
        ...(filters?.search && { search: filters.search }),
        ...(filters?.topicId && { topicId: filters.topicId }),
      },
    })
    .then(({ data }) => data);
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

export async function getUserTaskAnswers(
  userId: number
): Promise<ITaskUserAnswer[]> {
  return request.get(API_GET_USER_ANSWERS(userId)).then(({ data }) => data);
}
