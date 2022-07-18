import { AlertCreatedResponse, SubmitAlertForm } from '@app/models/alerts.model';
import { ModalFilters } from '@app/models/filters.model';
import api from '@app/services/interceptor';

export default class AlertsService {
  currentUrl = '/alerts/'

  postAlert(filters: ModalFilters, email: string, query: string) {
    const newFilters: SubmitAlertForm = {
      query_string: query,
      email: email,
      territory_id: filters.location as string,
      sub_themes: filters.themes && filters.themes.length ? filters.themes as string[] : undefined,
      gov_entities: filters.ente ? [filters.ente] : undefined,
    }
    return api.post(this.currentUrl, newFilters).then((response) => response as AlertCreatedResponse);
  }
}


