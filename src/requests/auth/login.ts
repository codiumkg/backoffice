import axios from "axios";
import { API_LOGIN } from "../../constants/apiConstants";
import { ILogin, ILoginResponse } from "../../interfaces/auth";

export default function loginRequest(data: ILogin): Promise<ILoginResponse> {
  return axios.post(API_LOGIN, data).then(({ data }) => data);
}
