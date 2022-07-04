import { refreshToken } from "./refreshToken";
import { tokenKeys } from "../ui/utils/storage-utils";

const contentType = { 'Content-Type': 'application/json' };

interface TokensModel {
  access?: string;
  refresh?:string;
}

export const config = {
  apiUrl: `http${location.hostname.includes('localhost') ? '' : 's'}://staging.diariodoclima.jurema.la/api`,
  headers: contentType,
  tokenHeaders: (tokens?: TokensModel) => {
    const headers = contentType as any;
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
      const contentType = response.headers.get("content-type");
      let newResponse;
      if(contentType && contentType.indexOf("application/json") !== -1) {
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

export const deleteTokens = () => {
  localStorage.removeItem(tokenKeys.access);
  localStorage.removeItem(tokenKeys.refresh);
}

