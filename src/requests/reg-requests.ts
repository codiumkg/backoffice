import axios from "axios";
import { API_REG_REQUESTS } from "../constants/apiConstants";

export async function getRegRequests(id?: number) {
  const paramId = id || "";

  if (paramId) {
    return axios.get(`${API_REG_REQUESTS}/${paramId}`).then(({ data }) => data);
  }

  return axios.get(API_REG_REQUESTS).then(({ data }) => data);
}

export async function removeRegRequest(id: number) {
  return axios.delete(`${API_REG_REQUESTS}${id}`).then(({ data }) => data);
}
