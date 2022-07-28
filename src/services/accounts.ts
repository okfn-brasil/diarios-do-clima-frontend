import { RegistrationModel, RegistrationResponse } from '@app/models/registration.model';
import { ChangePasswordForm, UserInfo, UserResponseModel, UserState } from '@app/models/user.model';
import api from '@app/services/interceptor';

export default class AccountService {
  currentUrl = '/accounts/users/';

  createNewAcount(form: RegistrationModel) {
    const newForm = {
      email: form.email.value,
      password: form.password.value,
      city: form.city.value,
      full_name: form.username.value,    
      gender: form.gender.value,
      state: form.state.value,
      sector: form.sector.value,
    };
    
    return api.post(this.currentUrl, newForm).then((response) => response as RegistrationResponse);
  }

  updateUserData(userData: UserInfo) {
    return api.patch(this.currentUrl + 'me/', userData).then((response) => response as UserResponseModel);
  }

  updateUserPassword(passwords: ChangePasswordForm) {
    return api.put(this.currentUrl + 'me/password_change/', passwords).then((response) => response as UserResponseModel);
  }

  getUserData() {
    return api.get(this.currentUrl + 'me/').then((response) => response as UserResponseModel);
  }

  getEmail(email: string) {
    return api.get(this.currentUrl + `email/${email}/`).then((response) => response);
  }
}