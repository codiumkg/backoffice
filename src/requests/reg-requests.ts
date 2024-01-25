import axios from "axios";
import { API_REG_REQUESTS } from "../constants/apiConstants";

export function getRegRequests(id?: number) {
  const paramId = id || "";

  if (paramId) {
    return axios.get(`${API_REG_REQUESTS}/${paramId}`).then(({ data }) => data);
  }

  return axios.get(API_REG_REQUESTS).then(({ data }) => data);
}
