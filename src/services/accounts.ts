import { RegistrationModel, RegistrationResponse } from '/src/models/registration.model';
import { config } from './api-config';

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
    return fetch(config.apiUrl + this.currentUrl, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(newForm)
    })
    .then(response => config.handleResponse(response));
  }

  getUserData(token: string) {
    return fetch(config.apiUrl + this.currentUrl + 'me/', {
      method: 'GET',
      headers: config.tokenHeaders({access: token}),
    })
    .then(response => config.handleResponse(response));
  }

  checkPlan(userData: RegistrationResponse) {
    return !!(userData.plan_subscription && 
    userData.plan_subscription.plan && 
    userData.plan_subscription.plan.pagseguro_plan_id);
  }
}