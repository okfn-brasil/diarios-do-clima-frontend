export interface RegistrationModel {
  username: InputModel;
  email: InputModel;
  password: InputModel;
  gender: InputModel;
  sector: InputModel;
  state: InputModel;
  city: InputModel;
  [key: string]: InputModel;
}

export interface InputModel {
  value: string;
  isValid?: boolean;
  errorMessage?: string;
}