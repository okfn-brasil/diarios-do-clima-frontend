export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}