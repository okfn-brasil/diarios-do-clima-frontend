import { tokenKeys } from "@app/ui/utils/storage-utils";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  params: {},
  baseURL: `http${location.hostname.includes('localhost') ? '' : 's'}://staging.diariodoclima.jurema.la/api`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(tokenKeys.access);
    if (token && config.headers) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  function (error) {
    const refresh_token = localStorage.getItem(tokenKeys.refresh);
    const erroCode = error.response.status;
    if (erroCode === 401 && !!refresh_token && !error.config.url.includes('token')) {
      const response = getAuthTokenRefreshed(refresh_token).then((response: any) => {
        localStorage.setItem(tokenKeys.access, response.access)
        error.config.headers.Authorization = `Bearer ${localStorage.getItem(tokenKeys.access)}`;
        error.config.__isRetryRequest = true;
        return axios(error.config).then(response => response.data);
       });
      return response;
    } else if (erroCode === 401 && !error.config.url.includes('token')) {
      localStorage.setItem(tokenKeys.refresh, '');
      localStorage.setItem(tokenKeys.access, '')
      location.href = '/?login=open';
    } else {
      return Promise.reject(error.response.data);
    }
  }
);

const getAuthTokenRefreshed = (refresh: string) => {
  return api.post('/token/refresh/', {refresh}).then((response) => response);
}


export default api;