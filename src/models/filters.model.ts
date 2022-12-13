import { formatMonth } from './gazettes.model';

export const ITEMS_PER_PAGE = 6;

export interface ModalFilters {
  territory_id?: string;
  ente?: string;
  themes?: (string | null)[];
  [key: string]: string | (string | null)[] | undefined;
}

export enum OrderFilter {
  relevance = 'relevance',
  descending_date = 'descending_date',
  ascending_date = 'ascending_date',
}

export interface ReqFilters {
  querystring?: string;
  offset: number;
  sort_by: string | undefined;
  size: number;
  until?: string | Date;
  published_since?: string | Date;
  territory_id?: string;
  subtheme?: string[];
  entities?: string[];
  [key: string]: string | Date | (string | null)[] | undefined | number | string[];
}

export const convertFiltersToModalFilters = (filters: FiltersStatePayload) => {
  const newFilters: ModalFilters = {
    territory_id: filters.territory_id,
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
  territory_id?: string;
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
  territory_id?: string;
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
  territory_id?: string;
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

// URL TO FILTERS
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
    territory_id: filters.territory_id || '0',
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

// FILTERS TO URL
export const parseFiltersToUrl = (filters: FiltersState) => {
  const [start, end] = [getDate(filters.dates, 'start'), getDate(filters.dates, 'end')];
  const period = start || end ? 0 : filters.period;

  const newFilters: FilterUrl = {
    query: filters.query,
    order: filters.order,
    territory_id: filters.territory_id,
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

// FILTERS TO API
export const parseFiltersToApi = (filters: FiltersState, currPage: number) => {
  const offset = currPage * filters.itemsPerPage;
  const pageSize = (offset + filters.itemsPerPage < 10000) ?  filters.itemsPerPage : 10000 - offset;
  const parsedFilters = parseFiltersToUrl(filters);
  const newFilters: ReqFilters = {
    querystring: parsedFilters.query,
    sort_by: parsedFilters.order,
    offset: offset,
    size: pageSize,
    until: parseDate(filters.dates?.end),
    published_since: filters.dates?.start || filters.dates?.end ? parseDate(filters.dates?.start) : parsePeriod(parsedFilters.period as number),
    territories: typeof parsedFilters.territory_id === 'string' ? parsedFilters.territory_id?.split(',') : parsedFilters.territory_id,
    subthemes: parsedFilters.themes?.map(theme => theme?.replace(/\ /g, '+')) as string[],
    entities: filters.ente ? [filters.ente] : undefined,
  };
  return convertToParams(newFilters)
}

const parsePeriod = (period: number) => {
  let prePeriod = new Date();
  if(period < 4) {
    prePeriod.setMonth(prePeriod.getMonth() - period);
  } else {
    prePeriod.setFullYear(1000);
  }
  return parseDate(prePeriod);
}

const parseDate = (date: Date | string | undefined) => {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${formatMonth(newDate.getMonth() + 1)}-${formatMonth(newDate.getDate())}`
  } else {
    return undefined;
  }
}

const convertToParams = (filters: ReqFilters) => {
  let params = Object.keys(filters)
  .filter(key => (!!filters[key]))
  .map(key => {
    if(Array.isArray(filters[key])) {
      const arrayItems = filters[key] as string[];
      const resultArray: string[] = [];
      arrayItems.forEach(item => {
        if(item !== '0') {
          resultArray.push(`${key}=${item}`);
        }
      });
      return resultArray.length ? resultArray.join('&') : '';
    } else {
      return `${key}=${filters[key]}`;
    }
  })
  .join('&');

  if(params[params.length - 1] === '&') {
    params = params.slice(0, -1);
  }
  return params;
}