import { AxiosResponse } from 'axios';
import { FormPurchaseModel, SessionModel, SubscriptionModel } from '../models/purchase.model';
import api from './interceptor';

interface CardValidateModel {
  electron: RegExp;
  maestro: RegExp;
  dankort: RegExp;
  interpayment: RegExp;
  unionpay: RegExp;
  visa: RegExp;
  mastercard: RegExp;
  amex: RegExp;
  diners: RegExp;
  discover: RegExp;
  jcb: RegExp;
  [key: string]: RegExp;
}

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

export const getCardType = (number: string) => {
  let re: CardValidateModel = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  };

  for(var key in re) {
    if(re[key].test(number)) {
      return key;
    }
  }

  return null;
}