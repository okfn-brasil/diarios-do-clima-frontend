import { RegistrationModel, RegistrationResponse } from '@app/models/registration.model';
import { UserInfo, UserResponseModel } from '@app/models/user.model';
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

  getUserData() {
    return api.get(this.currentUrl + 'me/').then((response) => response as UserResponseModel);
  }

  getEmail(email: string) {
    return api.get(this.currentUrl + `email/${email}/`).then((response) => response);
  }
}

export const checkPlan = (userData: UserResponseModel | RegistrationResponse) => {
  return !!(userData.plan_subscription && userData.plan_subscription.plan) ?
    userData.plan_subscription.plan.pagseguro_plan_id : null;
}