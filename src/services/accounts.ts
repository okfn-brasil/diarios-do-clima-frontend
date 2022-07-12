import { RegistrationModel, RegistrationResponse } from '@app/models/registration.model';
import { config, HeadersModel, request, TokensModel } from './service-utils';
import { UserResponseModel } from '../models/user.model';

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

    return request({
      url: this.currentUrl, 
      method: 'POST',
      body: newForm,
      notUseToken: true,
      customResponseHandler: (response: RegistrationResponse) => config.handleResponse(response, true)
    });
  }

  getUserData(token?: string) {
    return request({
      url: this.currentUrl + 'me/', 
      method: 'GET',
      customHeaders: config.tokenHeaders((token ? {access: token} : null) as TokensModel) as HeadersModel
    });
  }

  getEmail(email: string) {
    return request({
      url: this.currentUrl + `email/${email}/`, 
      method: 'GET',
      customResponseHandler: (response: Response) => { 
        return new Promise(async (resolve, reject) => { 
          response.ok ? reject(response) : resolve(response);
        })}
    });
  }
}

export const checkPlan = (userData: UserResponseModel | RegistrationResponse) => {
  return !!(userData.plan_subscription && userData.plan_subscription.plan) ?
    userData.plan_subscription.plan.pagseguro_plan_id : null;
}