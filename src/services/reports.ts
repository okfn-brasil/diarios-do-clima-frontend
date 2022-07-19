import { ReportsModel } from '@app/models/reports.model';
import api from '@app/services/interceptor';

export default class ReportsService {
  currentUrl = '/reports/';
  itemsPerPage = 6;

  getReports(page: number) {
    return api.get(this.currentUrl + `private/?limit=${this.itemsPerPage}&offset=${page * this.itemsPerPage}`).then((response) => response as ReportsModel);
  }
}

