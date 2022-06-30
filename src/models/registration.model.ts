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

export interface RegistrationResponse {
  city: string;
  email: string;
  full_name: string;
  gender: string;
  id: string;
  jwt: {
    access: string;
    refresh: string;
  }
  plan_subscription: {
    created_at: string;
    id: 2
    plan: {
      id: string;
      title: string;
      pagseguro_plan_id: string;
    }
    status: {
      id: number;
      data: string;
      created_at: string;
    }
  }
  sector: string;
  state: string;
}