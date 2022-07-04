export interface UrlsModel {
  registration: urlModel;
  home: urlModel;
  becomePro: urlModel;
  [key: string]: urlModel;
}

interface urlModel {
  url: string;
  isWhiteMenu?: boolean;
  hideLinks?: boolean;
}

export const urls: UrlsModel = {
  home: { url: '/'},
  registration: { url: '/cadastro', isWhiteMenu: true, hideLinks: true  },
  becomePro: { url: '/seja-assinante', isWhiteMenu: true, hideLinks: true },
  startSearch: { url: '/iniciar-busca', isWhiteMenu: true, hideLinks: true },
  terms: { url: '/termos', isWhiteMenu: true },
  about: { url: '/sobre' },
}