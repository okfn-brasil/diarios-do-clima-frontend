import { CNPJPartnerResponse, CNPJResponse } from '@app/models/cnpj.model';
import { FiltersState, parseFiltersToApi } from '@app/models/filters.model';
import { GazetteResponse } from '@app/models/gazettes.model';
import api from '@app/services/interceptor';
import { AxiosResponse } from 'axios';

export default class GazettesService {
  currentUrl = '/querido_diario/'

  getAllGazettes(filters: FiltersState, currPage: number) {
    return api.get(this.currentUrl + 'gazettes/?' + parseFiltersToApi(filters, currPage)).then((response) => response as GazetteResponse);
  }

  getCnpj(cnpj: string) {
    console.log("get_cnpj")
    return api.get(this.currentUrl + 'cnpjs/' + cnpj).then((response) => response as CNPJResponse);
  }

  getCnpjPartners(cnpj: string) {
    return api.get(this.currentUrl + `cnpjs/${cnpj}/partners`).then((response) => response as CNPJPartnerResponse);
  }

  getEntities() {
    return api.get(this.currentUrl + 'entities/').then((response) => response as AxiosResponse | string[]);
  }

  getThemes() {
    return api.get(this.currentUrl + 'subthemes/').then((response) => response as AxiosResponse | string[]);
  }
}


