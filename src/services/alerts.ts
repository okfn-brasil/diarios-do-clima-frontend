import { AlertModel, AlertsList, SubmitAlertForm } from '@app/models/alerts.model';
import { ModalFilters } from '@app/models/filters.model';
import api from '@app/services/interceptor';

export default class AlertsService {
  currentUrl = '/alerts/';
  itemsPerPage = 6;

  postAlert(filters: ModalFilters, query: string) {
    const newFilters: SubmitAlertForm = {
      query_string: query,
      territory_id: filters.location as string,
      sub_themes: filters.themes && filters.themes.length ? filters.themes as string[] : undefined,
      gov_entities: filters.ente ? [filters.ente] : undefined,
    }
    return api.post(this.currentUrl, newFilters).then((response) => response as AlertModel);
  }

  getAlerts(page: number) {
    return api.get(this.currentUrl + `?limit=${this.itemsPerPage}&offset=${page * this.itemsPerPage}`).then((response) => response as AlertsList);
  }

  deleteAlert(id: string) {
    return api.delete(this.currentUrl + id).then((response) => response as AlertModel);
  }
}


