import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface SubmitAlertForm extends AxiosRequestConfig {
  query_string: string;
  email?: string;
  territory_id?: string;
  sub_themes?: string[];
  gov_entities?: string[];
}

export interface AlertCreatedResponse extends AxiosResponse  {
  created_at: string;
  edited_at: string;
  email?: string;
  gov_entities?: string[];
  id: string;
  query_string: string;
  sub_themes?: string[];
  territory_id?: string;
  user: string;
}

export interface AlertsList extends AxiosResponse {
  count: number;
  next: number;
  previous: number;
  results: []
}