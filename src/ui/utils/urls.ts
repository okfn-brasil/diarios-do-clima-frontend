export interface UrlsModel {
  home: UrlModel;
  registration: UrlModel;
  becomePro: UrlModel;
  startSearch: UrlModel;
  about: UrlModel;
  terms: UrlModel;
  reports: UrlModel;
  purchase: UrlModel;
  plans: UrlModel;
  search: UrlModel;
  myReports: UrlModel;
  myAlerts: UrlModel;
  userInfo: UrlModel;
  cnpjs: UrlModel;
  notFound: UrlModel;
  [key: string]: UrlModel;
}

export interface UrlModel {
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
  about: { url: '/sobre', customColor: 'rgba(62, 109, 194, 1)' },
  reports: { url: '/relatorios' },
  purchase: { url: '/assine', isWhiteMenu: true },
  plans: { url: '/planos' },
  search: { url: '/busca' },
  myReports: { url: '/meus-relatorios', isWhiteMenu: true },
  myAlerts: { url: '/meus-alertas', isWhiteMenu: true },
  userInfo: { url: '/meus-dados', isWhiteMenu: true },
  cnpjs: { url: '/cnpjs/:id', isWhiteMenu: true },
  notFound: { url: '/not-found' },
}
