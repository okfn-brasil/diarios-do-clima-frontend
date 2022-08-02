import { ReportsModel } from '@app/models/reports.model';
import api from '@app/services/interceptor';

export default class ReportsService {
  currentUrl = '/reports/';
  itemsPerPage = 6;
  itemsPerPagePublic = 2;

  getReports(page: number) {
    return api.get(this.currentUrl + `private/?limit=${this.itemsPerPage}&offset=${page * this.itemsPerPage}`).then((response) => response as ReportsModel);
  }

  getPublicReports(page: number) {
    return api.get(this.currentUrl + `public/?limit=${this.itemsPerPagePublic}&offset=${page * this.itemsPerPagePublic}`).then((response) => response as ReportsModel);
  }
}

