import { FiltersState } from '@app/models/filters.model';
import { GazetteResponse } from '@app/models/gazettes.model';
import api from '@app/services/interceptor';

export default class GazettesService {
  currentUrl = '/querido_diario/'

  getAllGazettes(filters: FiltersState, currPage: number) {
    const newFilters = {}//{...filters, page: currPage}; TO DO FILTROS
    return api.get(this.currentUrl + 'gazettes/', newFilters).then((response) => response as GazetteResponse);
  }

  getCnpj(cnpj: string) {
    return api.get(this.currentUrl + 'cnpjs/' + cnpj).then((response) => response as any);
  }
}

const convertToParams = (filters: FiltersState) => {
  return Object.keys(filters)
  .map(key => `${key}=${filters[key]}`)
  .join('&');
}

