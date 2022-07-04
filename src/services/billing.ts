import { config } from './api-config';
import { FormPurchaseModel } from '../models/purchase.model';
declare const PagSeguroDirectPayment: any;

export default class BillingService {
  currentUrl = '/billing/';

  subscribe(form: FormPurchaseModel) {
    return this.getPagSeguroToken().then(pagSeguroResponse => {
      console.log(pagSeguroResponse)
      return Promise.all([this.postAddress(form), this.postPhone(form), this.postCreditCard(form)]).then(
        response => config.handleResponse(response)
      )
    });
  }

  getPagSeguroToken() {
    return this.getSessionId().then(
      (response) => {
        PagSeguroDirectPayment.setSessionId(response);
        return PagSeguroDirectPayment.createCardToken({
            cardNumber: '4111111111111111', // Número do cartão de crédito
            brand: 'visa', // Bandeira do cartão
            cvv: '123', // CVV do cartão
            expirationMonth: '12', // Mês da expiração do cartão
            expirationYear: '2030', // Ano da expiração do cartão, é necessário os 4 dígitos.
            success: function (response: any) {
              console.log(response.card.token);
              return response;
            },
            error: function (error: any) {
              return error;
            },
        });
      }
    )
  }

  getSessionId() {
    return fetch(config.apiUrl + this.currentUrl + 'session/', {
      method: 'GET',
      headers: config.tokenHeaders(),
    })
    .then(response => config.handleResponse(response));
  }

  postAddress(form: any) {
    const address = {
      street: form.address.value,
      //number: form.number.value,
      //complement: form.complement.value,
      //district: form.district.value,
      city: form.city.value,
      state: form.state.value,
      //country: form.state.country,
      postal_code: form.cep.value,
    };

    fetch(config.apiUrl + this.currentUrl + 'address/', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(address)
    });
  }

  postPhone(form: any) {
    const phone = {
      area_code: form.phone.value.substring(0, 2),
      number: form.phone.value.substring(3, 12),
    };

    fetch(config.apiUrl + this.currentUrl + 'phone/', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(phone)
    });
  }

  postCreditCard(form: any) {
    const cardSplited = form.card.value.split(' ');
    const birthday = form.birthday.value;
    const card = {
      token: '',
      last_four_digits: cardSplited[cardSplited.length - 1],
      exp_month: form.validity.value.substring(0, 2),
      exp_year: form.validity.value.substring(2, 6),
      holder_name: form.fullName.value,
      cpf: form.cpf.value,
      holder_birth_date: `${birthday.substring(4, 8)}-${birthday.substring(2, 4)}-${birthday.substring(0, 2)}`
    };
    fetch(config.apiUrl + this.currentUrl + 'credit_card/', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(card)
    });
  }

}