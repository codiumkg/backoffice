import { API_LOGIN } from "../../constants/apiConstants";
import { ILogin, ILoginResponse } from "../../interfaces/auth";
import { request } from "../request";

export default function loginRequest(data: ILogin): Promise<ILoginResponse> {
  return request.post(API_LOGIN, data).then(({ data }) => data);
}
