import { AxiosResponse } from "axios";

export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse extends AxiosResponse {
  access: string;
  refresh: string;
}