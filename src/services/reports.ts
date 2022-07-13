import { FiltersState } from '@app/models/filters.model';
import api from './interceptor';

export default class ReportsService {
  currentUrl = '/reports/';

  getAllReports(filters: FiltersState, currPage: number) {
    const newFilters = {}//{...filters, page: currPage};
    return api.get(this.currentUrl + 'public/?', newFilters).then((response) => response as any);
  }

  getUserReports() {
    return api.get(this.currentUrl + 'private/').then((response) => response as any);
  }

  getReport(id: string) {
    return api.get(this.currentUrl + `${id}/`).then((response) => response as any);
  }

}

const convertToParams = (filters: FiltersState) => {
  return Object.keys(filters)
  .map(key => `${key}=${filters[key]}`)
  .join('&');
}

