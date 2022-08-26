import { AxiosResponse } from "axios";

export interface City {
  level: string;
  state_code: string;
  territory_id: string;
  territory_name: string;
}

export interface CitiesResponse extends AxiosResponse {
  data: {
    cities: City[];
  }
}