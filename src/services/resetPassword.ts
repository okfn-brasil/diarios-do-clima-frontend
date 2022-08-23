import api from '@app/services/interceptor';

export default class ResetPasswordService {
  currentUrl = '/password_reset/';

  startReset(email: string) {
    return api.post(this.currentUrl, { email }).then((response) => response);
  }

  validateToken(token: string) {
    return api.post(this.currentUrl + 'validate_token/', { token }).then((response) => response);
  }
  
  resetPassword(token: string, password: string) {
    return api.post(this.currentUrl + 'confirm/', { token, password }).then((response) => response);
  }
}


