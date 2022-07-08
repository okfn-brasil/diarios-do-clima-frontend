export interface FiltersStatePayload {
  itemsPerPage?: number;
  query?: string;
  order?: string;
  location?: string;
  ente?: string;
  dates?: Dates;
  themes?: any;
  period?: number;
}

export interface SubmitDates {
  dates: Dates | null,
  period: number | null,
}

export interface FiltersState {
  itemsPerPage: number;
  query?: string;
  order?: string;
  location?: string;
  ente?: string;
  dates?: Dates;
  themes?: any;
  period?: number;
  [key: string]: string | Date | number | undefined | Dates ;
}

export interface Dates {
  start: string | Date;
  end: string | Date;
}