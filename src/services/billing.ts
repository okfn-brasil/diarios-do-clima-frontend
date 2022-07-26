import { AxiosResponse } from 'axios';
import { FormPurchaseModel, SessionModel, SubscriptionModel } from '@app/models/purchase.model';
import api from '@app/services/interceptor';

export default class BillingService {
  currentUrl = '/billing/';

  getSessionId() {
    return api.get(this.currentUrl + `session/`).then((response) => response as SessionModel);
  }

  getAddress() {
    return api.get(this.currentUrl + `address/`).then((response) => response as AxiosResponse);
  }

  getPhone() {
    return api.get(this.currentUrl + `phone/`).then((response) => response as AxiosResponse);
  }

  addAddress(form: FormPurchaseModel, method: string) {
    const address = {
      street: form.address.value,
      number: form.number.value,
      complement: form.complement.value || 'vazio',
      district: form.district.value,
      country: 'BRA',
      city: form.city.value,
      state: form.state.value,
      postal_code: form.cep.value,
    };
    return api[method === 'POST' ? 'post' : 'put'](this.currentUrl + `address/`, address).then((response) => response as AxiosResponse);
  }

  addPhone(form: FormPurchaseModel, method: string) {
    const phone = {
      area_code: form.phone.value.substring(0, 2),
      number: form.phone.value.substring(3, 12),
    };
    return api[method === 'POST' ? 'post' : 'put'](this.currentUrl + `phone/`, phone).then((response) => response as AxiosResponse);
  }

  postCreditCard(form: FormPurchaseModel, token: string) {
    const birthday = form.birthday.value;
    const card = {
      token: token,
      last_four_digits: form.card.value.substring(12,16),
      exp_month: form.validity.value.substring(0, 2),
      exp_year: form.validity.value.substring(2, 6),
      holder_name: form.fullName.value,
      cpf: form.cpf.value,
      holder_birth_date: `${birthday.substring(4, 8)}-${birthday.substring(2, 4)}-${birthday.substring(0, 2)}`
    };

    return api.post(this.currentUrl + `credit_card/`, card).then((response) => response as AxiosResponse);
  }

  postSubscription(planId: string) {
    return api.post(`/subscriptions/`, { plan: planId }).then((response) => response as SubscriptionModel );
  }
}
