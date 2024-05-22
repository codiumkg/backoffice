import { API_CHANGE_PASSWORD } from "@/constants/apiConstants";
import { IChangePassword } from "@/interfaces/auth";
import { request } from "../request";

export async function changePassword(data: IChangePassword) {
  return request.post(API_CHANGE_PASSWORD, data).then(({ data }) => data);
}
