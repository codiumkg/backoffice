import { API_USERDATA } from "../../constants/apiConstants";
import { IUserData } from "../../interfaces/auth";
import { request } from "../request";

export default async function getUserData(): Promise<IUserData> {
  return request.get(API_USERDATA).then(({ data }) => data);
}
