export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
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