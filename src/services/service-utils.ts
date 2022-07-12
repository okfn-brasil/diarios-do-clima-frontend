import { refreshToken } from './refreshToken';
import { tokenKeys } from '../ui/utils/storage-utils';

export interface HeadersModel {
  'Content-Type': string;
  Authorization: string;
}

const contentType = { 'Content-Type': 'application/json' };

export interface TokensModel {
  access?: string;
  refresh?:string;
}

interface ReqData {
  url: string;
  method: string;
  notUseToken?: boolean;
  customHeaders?: HeadersModel;
  body?: any;
  customResponseHandler?: any;
}

export const config = {
  apiUrl: `http${location.hostname.includes('localhost') ? '' : 's'}://staging.diariodoclima.jurema.la/api`,
  headers: contentType,
  tokenHeaders: (tokens?: TokensModel) => {
    const headers = contentType as HeadersModel;
    if(!tokens) {
      tokens = {
        access: localStorage.getItem(tokenKeys.access) as string,
      }
    }
    if(tokens.refresh || tokens.access) {
      headers.Authorization = 'Bearer ' + (tokens.refresh || tokens.access);
    }
    return headers;
  },
  handleResponse: (response: any, preventRefresh = false): any => {
    return new Promise(async (resolve, reject) => {
      const contentType = response.headers.get('content-type');
      let newResponse;
      if(contentType && contentType.indexOf('application/json') !== -1) {
        newResponse = await response.json();
      }
      if(response.ok && newResponse) {
        resolve(newResponse);
      } else {
        if(response.status === 401 && !preventRefresh) {
          refreshToken();
        } else {
          reject(newResponse);
        }
      }
    })
  },
}

export const request = (reqData: ReqData) => {
  return fetch(config.apiUrl + reqData.url, {
    method: reqData.method,
    headers: reqData.notUseToken ? config.headers : (reqData.customHeaders || config.tokenHeaders()),
    body: reqData.body ? JSON.stringify(reqData.body) : null
  })
  .then(response => reqData.customResponseHandler ? reqData.customResponseHandler(response) : config.handleResponse(response));
}
