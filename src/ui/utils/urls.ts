export interface RegistrationModel {
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


export const urls: RegistrationModel = {
  registration: { url: '/cadastro', isWhiteMenu: true, hideLinks: true  },
  home: { url: '/', isWhiteMenu: false},
  becomePro: { url: '/seja-assinante', isWhiteMenu: true, hideLinks: true },
  startSearch: { url: '/iniciar-busca', isWhiteMenu: true, hideLinks: true },
}