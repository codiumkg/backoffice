import axios from "axios";
import { API_USERDATA } from "../../constants/apiConstants";
import { IUserData } from "../../interfaces/auth";

export default async function getUserData(): Promise<IUserData> {
  return axios.get(API_USERDATA).then(({ data }) => data);
}
