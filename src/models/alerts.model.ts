import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface SubmitAlertForm extends AxiosRequestConfig {
  query_string: string;
  email?: string;
  territories?: string;
  sub_themes?: string[];
  gov_entities?: string[];
}

export interface AlertModel extends AxiosResponse  {
  created_at: string;
  edited_at: string;
  email?: string;
  gov_entities?: string[];
  id: string;
  query_string: string;
  sub_themes?: string[];
  territories?: string[];
  user: string;
}

export interface AlertsList extends AxiosResponse {
  count: number;
  next: number;
  previous: number;
  results: AlertModel[];
}