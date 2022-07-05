import { blue } from "./colors";

export interface UrlsModel {
  home: urlModel;
  registration: urlModel;
  becomePro: urlModel;
  startSearch: urlModel;
  about: urlModel;
  terms: urlModel;
  reports: urlModel;
  purchase: urlModel;
  plans: urlModel;
  search: urlModel;
  [key: string]: urlModel;
}

interface urlModel {
  url: string;
  isWhiteMenu?: boolean;
  hideLinks?: boolean;
  customColor?: string;
}

export const urls: UrlsModel = {
  home: { url: '/'},
  registration: { url: '/cadastro', isWhiteMenu: true, hideLinks: true  },
  becomePro: { url: '/seja-assinante', isWhiteMenu: true, hideLinks: true },
  startSearch: { url: '/iniciar-busca', isWhiteMenu: true, hideLinks: true },
  terms: { url: '/termos', isWhiteMenu: true },
  about: { url: '/sobre', customColor: blue },
  reports: { url: '/relatorios' },
  purchase: { url: '/assine', isWhiteMenu: true },
  plans: { url: '/planos' },
  search: { url: '/busca' }
}
