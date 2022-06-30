import { config } from './api-config';
import { LoginModel } from '/src/models/login.model';

export default class LoginService {
  currentUrl = '/token/';

  login(form: LoginModel) {
    const newForm = {
      email: form.email,
      password: form.password,
    };
    return fetch(config.apiUrl + this.currentUrl, {
      method: 'POST',
      headers: config.tokenHeaders(),
      body: JSON.stringify(newForm)
    })
    .then(response => config.handleResponse(response));
  }
}