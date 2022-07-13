import { LoginModel, LoginResponse } from '@app/models/login.model';
import api from './interceptor';

export default class LoginService {
  currentUrl = '/token/';

  login(form: LoginModel) {
    const newForm = {
      email: form.email,
      password: form.password,
    };

    return api.post(this.currentUrl, newForm).then((response) => response as any);
  }
}