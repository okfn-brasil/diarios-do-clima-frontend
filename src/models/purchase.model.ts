import { InputModel } from './forms.model';

export interface FormPurchaseModel {
  card: InputModel;
  fullName: InputModel;
  validity: InputModel;
  cvv: InputModel;
  address: InputModel;
  city: InputModel;
  state: InputModel;
  cep: InputModel;
  cpf: InputModel;
  birthday: InputModel;
  phone: InputModel;
  district: InputModel;
  complement: InputModel;
  number: InputModel;
  [key: string]: InputModel;
}