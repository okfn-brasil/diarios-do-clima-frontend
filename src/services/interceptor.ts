import { tokenKeys } from '@app/ui/utils/storage-utils';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RefreshResponse extends AxiosResponse {
  access: string;
}

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  params: {},
  baseURL: `http${location.hostname.includes('localhost') ? '' : 's'}://backend-api.diariodoclima.ok.org.br/api`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(tokenKeys.access);
    if (token && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + token;
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
      const response = getAuthTokenRefreshed(refresh_token).then((response: RefreshResponse) => {
        localStorage.setItem(tokenKeys.access, response.access)
        error.config.headers.Authorization = `Bearer ${localStorage.getItem(tokenKeys.access)}`;
        error.config.__isRetryRequest = true;
        return axios(error.config).then(response => response.data);
       }).catch(() => {
        onRefreshError();
       });
      return response;
    } else if (erroCode === 401 && error.config.url.includes('refresh')) {
      onRefreshError();
    } else {
      return Promise.reject(error.response.data);
    }
  }
);

const onRefreshError = () => {
  localStorage.setItem(tokenKeys.refresh, '');
  localStorage.setItem(tokenKeys.access, '');
  location.href = '/?login=open';
}

const getAuthTokenRefreshed = (refresh: string) => {
  return api.post('/token/refresh/', {refresh}).then((response) => response as RefreshResponse);
}


export default api;