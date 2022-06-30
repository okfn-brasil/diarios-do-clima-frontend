import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

const contentType = { 'Content-Type': 'application/json' };

export const config = {
  apiUrl: 'http://staging.diariodoclima.jurema.la/api',
  headers: contentType,
  tokenHeaders: () => {
    const headers = contentType as any;
    console.log(localStorage.getItem('tk'))
    if(localStorage.getItem('tk')) {
      headers.Authorization = 'Bearer ' + localStorage.getItem('tk');
    }
    return headers;
  },
  handleResponse: (response: any, isLogin: boolean = false): any => {
    return new Promise(async (resolve, reject) => {
      const contentType = response.headers.get("content-type");
      let newResponse;
      if(contentType && contentType.indexOf("application/json") !== -1) {
        newResponse = await response.json();
      }
      if(response.ok && newResponse) {
        resolve(newResponse);
      } else {
        reject(isLogin ? newResponse : response.status);
      }
    })
  },
}