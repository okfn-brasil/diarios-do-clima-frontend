import { RegistrationModel } from '/src/models/registration.model';
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
}