import { config, request } from './service-utils';
import { LoginModel } from '@app/models/login.model';

export default class LoginService {
  currentUrl = '/token/';

  login(form: LoginModel) {
    const newForm = {
      email: form.email,
      password: form.password,
    };

    return request({
      url: this.currentUrl, 
      method: 'POST',
      body: newForm,
      notUseToken: true,
      customResponseHandler: (response: any) => config.handleResponse(response, true)
    });
  }

  refreshLogin(refresh: string) {
    return request({
      url: this.currentUrl + 'refresh/', 
      method: 'POST',
      notUseToken: true,
      body: { refresh }
    });
  }
}