import { request } from './service-utils';

export default class ReportsService {
  currentUrl = '/reports/';

  getAllReports(filters: any, pagination: any) {
    const newFilters = {...filters, page: pagination};
    return request({
      url: this.currentUrl + 'public/?', //+ convertToParams(newFilters), 
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

const convertToParams = (filters: any) => {
  return Object.keys(filters)
  .map(key => `${key}=${filters[key]}`)
  .join('&');
}

