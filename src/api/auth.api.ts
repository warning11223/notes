import { AxiosResponse } from "axios";
import { instance } from "./api";
import { ResponseType } from "./tasks.api";

export const authAPI = {
  login(data: AuthRequestType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>, AuthRequestType>
    >("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType<{}>>("auth/login");
  },
  me() {
    return instance.get<ResponseType<AuthResponseMeType>>("auth/me");
  },
  captcha() {
    return instance.get<{url: string}>('security/get-captcha-url')
  }
};

export type AuthRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export type AuthResponseMeType = {
  id: number;
  email: string;
  login: string;
};
