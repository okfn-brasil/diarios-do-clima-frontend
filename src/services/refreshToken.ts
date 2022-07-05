import { LoginResponse } from "../models/login.model";
import LoginService from "./login";
import { deleteTokens, tokenKeys } from "../ui/utils/storage-utils";

export const refreshToken = () => {
  const loginService = new LoginService();
  loginService.refreshLogin(localStorage.getItem(tokenKeys.refresh) as string)
  .then((response: LoginResponse) => {
    localStorage.setItem(tokenKeys.access, response.access);
    location.reload();
  }).catch(() => {
    deleteTokens();
    location.href = '/?login=open';
  });
}