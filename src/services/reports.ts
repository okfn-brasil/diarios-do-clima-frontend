import { FiltersState } from '@app/models/filters.model';
import { request } from './service-utils';

export default class ReportsService {
  currentUrl = '/reports/';

  getAllReports(filters: FiltersState, currPage: number) {
    const newFilters = {...filters, page: currPage};
    return request({
      url: this.currentUrl + 'public/?', //+ convertToParams(newFilters),  // TO DO
      method: 'GET',
    });
  }

  getUserReports() {
    return request({
      url: this.currentUrl + 'private/', 
      method: 'GET',
    });
  }

  getReport(id: string) {
    return request({
      url: this.currentUrl + id + '/', 
      method: 'GET',
    });
  }

}

const convertToParams = (filters: FiltersState) => {
  return Object.keys(filters)
  .map(key => `${key}=${filters[key]}`)
  .join('&');
}

