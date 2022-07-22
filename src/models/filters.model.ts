import { AxiosRequestConfig } from "axios";

export const ITEMS_PER_PAGE = 6;

export interface ModalFilters {
  location?: string;
  ente?: string;
  themes?: (string | null)[];
  [key: string]: string | (string | null)[] | undefined;
}

export interface ReqFilters {
  querystring?: string;
  offset: number;
  order: string | undefined;
  size: number;
  until?: string | Date;
  since?: string | Date;
  local?: string;
  subthemes?: string[];
  entities?: string[];
  [key: string]: string | Date | (string | null)[] | undefined | number | string[];
}

export const convertFiltersToModalFilters = (filters: FiltersStatePayload) => {
  const newFilters: ModalFilters = {
    location: filters.location,
    ente: filters.ente,
    themes: filters.themes ? Object.keys(filters.themes as Theme).map(theme => {
      return !!filters.themes && filters.themes[theme] ? theme : null;
    }).filter(theme => !!theme) : []
  };

  Object.keys(newFilters).forEach((key: string) => {
    if(!newFilters[key] || newFilters[key] === '0') {
      delete newFilters[key];
    }
  });
  return newFilters;
}

export interface FiltersStatePayload {
  itemsPerPage?: number;
  query?: string;
  order?: string;
  location?: string;
  ente?: string;
  dates?: Dates;
  themes?: Theme;
  period?: number;
  [key: string]: FiltersKeys;
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
  themes?: Theme;
  period?: number;
  [key: string]: FiltersKeys;
}

export interface Dates {
  start: string | Date;
  end: string | Date;
  [key: string]: string | Date;
}

export interface FilterUrl {
  query?: string;
  order?: string;
  location?: string;
  ente?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  themes?: (string | null)[];
  period?: number;
  [key: string]: FiltersKeys;
}

export interface Theme {
  [key: string]: boolean | null;
}

type FiltersKeys = (string | [] | Dates | Theme | number | Date | (string | null)[] | null | undefined);

export const parseUrlToFilters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filters = Object.fromEntries(urlParams);
  const themes: Theme = {};
  if (filters.themes) {
    filters.themes.split(',').forEach((theme: string) => {
      themes[theme] = true;
    })
  }
  const newFilters: FiltersState = {
    itemsPerPage: ITEMS_PER_PAGE,
    query: filters.query,
    order: filters.order,
    location: filters.location || '0',
    ente: filters.ente || '0',
    dates: { 
      start: filters.startDate ? new Date(filters.startDate) : '',
      end: filters.endDate ? new Date(filters.endDate) : '',
    },
    themes: themes,
    period: parseInt(filters.period),
  }
  return newFilters;
}

export const parseFiltersToUrl = (filters: FiltersState) => {
  const [start, end] = [getDate(filters.dates, 'start'), getDate(filters.dates, 'end')];
  const period = start || end ? 0 : filters.period;

  const newFilters: FilterUrl = {
    query: filters.query,
    order: filters.order,
    location: filters.location,
    ente: filters.ente,
    startDate: start,
    endDate: end,
    themes: filters.themes ? Object.keys(filters.themes as Theme)
    .map(theme => (filters.themes as Theme)[theme] ? theme : null).filter(item=> !!item) : [],
    period: period,
  }
  Object.keys(newFilters).forEach(filter => {
    const currItem = newFilters[filter];
    const invalid = ['0', null, '', undefined, 0] as FiltersKeys[];
    if (invalid.includes(currItem) || (Array.isArray(currItem) && !currItem.length)) {
      delete newFilters[filter];
    }
  });
  return newFilters;
}

const getDate = (dates: Dates | undefined, key: string ) => {
  if(dates && dates[key]) {
    const date = new Date(dates[key]);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  } else {
    return null;
  }
}