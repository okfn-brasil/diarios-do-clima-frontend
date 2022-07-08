export interface UserState {
  access?: string | null;
  refresh?: string | null;
  full_name?: string | null;
  id?: string | null;
  plan_pro?: string | null;
}

export interface UserResponseModel {
  address: {
    city: string;
    complement: string;
    country: string;
    district: string;
    number: string;
    postal_code: string;
    state: string;
    street: string;
  }
  city: string;
  credit_card: {
    cpf: string;
    created_at: string;
    exp_month: string;
    exp_year: string;
    holder_birth_date: string;
    holder_name: string;
    last_four_digits: string;
    token: string;
  }
  date_joined: string;
  email: string;
  full_name: string;
  gender: string;
  id: string;
  last_login: string;
  phone: {
    area_code: string;
    number: string;
  }
  plan_subscription:{
    created_at: string;
    id: number;
    plan:{
      id: string;
      pagseguro_plan_id: string;
      title: string;
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