import { CNPJPartnerResponse, CNPJResponse } from '@app/models/cnpj.model';
import { FiltersState, parseFiltersToUrl, ReqFilters } from '@app/models/filters.model';
import { formatMonth, GazetteResponse } from '@app/models/gazettes.model';
import api from '@app/services/interceptor';

export default class GazettesService {
  currentUrl = '/querido_diario/'

  getAllGazettes(filters: FiltersState, currPage: number) {
    return api.get(this.currentUrl + 'gazettes/?' + getFilters(filters, currPage)).then((response) => response as GazetteResponse);
  }

  getCnpj(cnpj: string) {
    return api.get(this.currentUrl + 'cnpjs/' + cnpj).then((response) => response as CNPJResponse);
  }

  getCnpjPartners(cnpj: string) {
    return api.get(this.currentUrl + `cnpjs/${cnpj}/partners`).then((response) => response as CNPJPartnerResponse);
  }
}

const getFilters = (filters: FiltersState, currPage: number) => {
  const offset = currPage * filters.itemsPerPage;
  const pageSize = (offset + filters.itemsPerPage < 10000) ?  filters.itemsPerPage : 10000 - offset;
  const parsedFilters = parseFiltersToUrl(filters);
  const newFilters: ReqFilters = {
    querystring: parsedFilters.query,
    order: parsedFilters.order,
    offset: offset,
    size: pageSize,
    until: parseDate(filters.dates?.end),
    since: filters.dates?.start || filters.dates?.end ? parseDate(filters.dates?.start) : parsePeriod(parsedFilters.period as number),
    territory_id: parsedFilters.location,
    subthemes: parsedFilters.themes as string[],
    entities: filters.ente ? [filters.ente] : undefined,
  };
  return convertToParams(newFilters)
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
