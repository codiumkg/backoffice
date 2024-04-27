import { request } from "./request";
import { API_REG_REQUESTS } from "../constants/apiConstants";

export async function getRegRequests(id?: number) {
  const paramId = id || "";

  if (paramId) {
    return request
      .get(`${API_REG_REQUESTS}/${paramId}`)
      .then(({ data }) => data);
  }

  return request.get(API_REG_REQUESTS).then(({ data }) => data);
}

export async function removeRegRequest(id: number) {
  return request.delete(`${API_REG_REQUESTS}${id}`).then(({ data }) => data);
}
