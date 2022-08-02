import { AxiosResponse } from 'axios';

export interface ReportsModel extends AxiosResponse {
  count: number;
  next: string;
  previous: string;
  results: ReportModel[];
}

export interface ReportModel {
  created_at: string | Date;
  file: string;
  id: string;
  is_public: boolean;
  title: string;
  description: string;
  location: string;
}

export interface ReportsListModel {
  [key: number]: ReportModel[];
}
