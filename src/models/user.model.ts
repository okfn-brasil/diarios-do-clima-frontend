import { AxiosResponse } from 'axios';

export interface UserState {
  access?: string | null;
  refresh?: string | null;
  full_name?: string | null;
  id?: string | null;
  plan_pro?: boolean | string | null;
  email?: string | null;
  gender?: string | null;
  sector?: string | null;
  address?: Address;
  city?: string;
  state?: string;
  credit_card?: Card;
  date_joined?: string;
  alert_email?: string;
  plan_subscription?: Plan;
  phone?: Phone;
}

export interface UserInfo {
  alert_email?: string;
  address?: Address;
  city?: string;
  credit_card?: Card;
  date_joined?: string;
  email?: string;
  full_name?: string;
  gender?: string;
  id?: string;
  last_login?: string;
  phone?: Phone;
  plan_subscription?: Plan;
  sector?: string;
  state?: string;
  password?: string;
}

export interface UserResponseModel extends AxiosResponse, UserInfo {

}

interface Phone {
  area_code: string;
  number: string;
}

interface Address {
  city: string;
  complement: string;
  country: string;
  district: string;
  number: string;
  postal_code: string;
  state: string;
  street: string;
}

interface Card {
  cpf: string;
  created_at: string;
  exp_month: string;
  exp_year: string;
  holder_birth_date: string;
  holder_name: string;
  last_four_digits: string;
  token: string;
}

interface Plan {
  created_at?: string;
  id?: number;
  plan:{
    id: string;
    pagseguro_plan_id: string;
    title: string;
  }
  status?: {
    id: number;
    data: string;
    created_at: string;
  }
  trial_end_at?: string;
}

export interface ChangePasswordForm {
  old_password: string;
  new_password1: string;
  new_password2: string;
}