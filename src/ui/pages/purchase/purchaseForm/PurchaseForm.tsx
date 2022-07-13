import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { InputModel, InputType } from '@app/models/forms.model';
import { FormPurchaseModel } from '@app/models/purchase.model';
import BillingService, { getCardType } from '@app/services/billing';
import { userUpdate } from '@app/stores/user.store';
import TextInput from '@app/ui/components/forms/input/Input';
import SelectInput from '@app/ui/components/forms/select/Select';
import Loading from '@app/ui/components/loading/Loading';
import { urls } from '@app/ui/utils/urls';
import { Grid } from '@mui/material';

import PurchaseDetails from '../purchaseDetails/PurchaseDetails';
import PurchaseSubmit from '../purchaseSubmit/PurchaseSubmit';

import './PurchaseForm.scss';

interface ValidationModel {
  card: (s: InputModel) => string | boolean;
  fullName: (s: InputModel) => string | boolean;
  cvv: (s: InputModel) => string | boolean;
  address: (s: InputModel) => string | boolean;
  city: (s: InputModel) => string | boolean;
  district: (s: InputModel) => string | boolean;
  cep: (s: InputModel) => string | boolean;
  cpf: (s: InputModel) => string | boolean;
  phone: (s: InputModel) => string | boolean;
  birthday: (s: InputModel) => string | boolean | undefined;
  validity: (s: InputModel) => string | boolean | undefined;
  [key: string]: (s: InputModel) => string | boolean | undefined;
}

const emptyError = <></>;
const inputsDefaultValue: FormPurchaseModel = {
  card: { value: '' },
  fullName: { value: '' },
  validity: { value: '' },
  cvv: { value: '' },
  address: { value: '' },
  city: { value: '' },
  state: { value: '' },
  cep: { value: '' },
  birthday: { value: '' },
  cpf: { value: '' },
  phone: { value: '' },
  district: { value: '' },
  complement: { value: '' },
  number: { value: '' },
};

const validateDate = (value: string, minMaxValidation: (d: Date) => boolean) => {
  if(!value) { return; }
  const dateArray = value.split('/');
  const year = dateArray[dateArray.length - 1];
  const month = dateArray[dateArray.length - 2];
  const day = dateArray[dateArray.length - 3] || 1;
  const newDate: Date = new Date(`${month}/${day}/${year}`);
  return newDate.toString() === 'Invalid Date' || minMaxValidation(newDate) ? 'A data inserida é inválida' : false;
};

const getCardValue = (value: string) => {
  return getInputWithoutMask(value.replace(/ /g,''));
};

const getInputWithoutMask = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  const newValue = value.replace(/[&\/\\#,+()$~%!.„'":*‚^_¤?<>|@ª{«»§}©®™]/g, '').replace('-', '');
  return newValue;
};

const inputValidation = (value: string, minSize: number, text: string) => {
  return value && getInputWithoutMask(value).length < minSize ? text : false;
};

const cardValidation = (value: string, text: string) => {
  return !getCardType(getCardValue(value)) ? text : false;
};

const fieldValidations: ValidationModel = {
  card: (s: InputModel) => { return cardValidation(s.value, 'O cartão inserido é inválido');},
  fullName: (s: InputModel) => { return inputValidation(s.value, 8, 'O campo deve possuir no mínimo 8 caracteres');},
  cvv: (s: InputModel) => { return inputValidation(s.value, 3, 'O CVV inserido é inválido');},
  address: (s: InputModel) => { return inputValidation(s.value, 5, 'O campo deve possuir no mínimo 5 caracteres');},
  city: (s: InputModel) => { return inputValidation(s.value, 5, 'O campo deve possuir no mínimo 5 caracteres');},
  district: (s: InputModel) => { return inputValidation(s.value, 5, 'O campo deve possuir no mínimo 5 caracteres');},
  cep: (s: InputModel) => { return inputValidation(s.value, 8, 'O CEP inserido é inválido');},
  cpf: (s: InputModel) => { return inputValidation(s.value, 11, 'O CPF inserido é inválido');},
  phone: (s: InputModel) => { return inputValidation(s.value, 11, 'O número de telefone inserido é inválido');},
  birthday: (s: InputModel) => { return validateDate(s.value, (value: Date) => !(new Date() > value));},
  validity: (s: InputModel) => { return validateDate(s.value, (value: Date) => !(new Date() < value));},
};
const homePhoneMask = '(99) 9999-99999';
const mobilePhoneMask = '(99) 99999-9999';

const PurchaseForm = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const billingService = new BillingService();
  const [inputs, setInputs] : [FormPurchaseModel, Dispatch<SetStateAction<FormPurchaseModel>>] = useState(inputsDefaultValue);
  const [submitForm, setSubmitForm] : [FormPurchaseModel, Dispatch<SetStateAction<FormPurchaseModel>>] = useState(inputsDefaultValue);
  const [phoneMask, setPhoneMask] : [string, Dispatch<SetStateAction<string>>] = useState(homePhoneMask);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [submitError, setSubmitError] : [JSX.Element, Dispatch<JSX.Element>] = useState(emptyError);
  const [phoneMethod, setPhoneMethod] : [string, Dispatch<string>] = useState('POST');
  const [addressMethod, setAddressMethod] : [string, Dispatch<string>] = useState('POST');

  useEffect(() => {
    getMethodsType();
  }, []);

  const getMethodsType = () => {
    billingService.getPhone().then(() => {
      setPhoneMethod('PUT');
    }).catch(() => {
      setPhoneMethod('POST');
    });

    billingService.getAddress().then(() => {
      setAddressMethod('PUT');
    }).catch(() => {
      setAddressMethod('POST');
    });
  };

  const getPhoneMask = (name: string, value: string) => {
    if(name === 'phone') {
      const phoneLength = getInputWithoutMask(value).length;
      setPhoneMask(phoneLength <= 11 ? homePhoneMask : mobilePhoneMask);
    }
  };

  const inputChange = (event: InputType) => {
    const {name, value} = event.target;
    getPhoneMask(name, value);
    setInputs((values: FormPurchaseModel) => ({...values, [name]: { value: value, isValid: values[name].isValid }}));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(emptyError);
    const errors = [];
    Object.keys(inputs).forEach((key: string) => {
      const input: InputModel = inputs[key];
      const validator = fieldValidations[key] ? fieldValidations[key](input) : false;
      if(inputs[key].value) {
        setInputs((values: FormPurchaseModel) => ({...values, [key]: {...input, errorMessage: validator as string}}));
        if(typeof validator === 'string') {
          errors.push(key);
        }
      }
    });
    if(!errors.length) {
      const newInputs: FormPurchaseModel = {} as FormPurchaseModel;
      Object.keys(inputs).forEach((key: string) => {
        newInputs[key] = { value: key === 'card' ? getCardValue(inputs[key].value): getInputWithoutMask(inputs[key].value)};
      });
      setSubmitForm(newInputs);
      setLoading(true);
    }
  };

  const onError = (errorMessage: JSX.Element) => {
    setLoading(false);
    setSubmitError(errorMessage);
    getMethodsType();
  };

  const onSuccess = (response: string) => {
    dispatch(userUpdate({
      plan_pro: response,
    }));
    navigate(urls.startSearch.url);
  };

  return (
    <form className='purchase-form' onSubmit={handleSubmit} >
      <PurchaseSubmit phoneMethod={phoneMethod} addressMethod={addressMethod} isSubmitting={isLoading} onSuccess={onSuccess} onError={onError} form={submitForm} />
      <Loading isLoading={isLoading}></Loading>
      <Grid item sm={7} xs={12}>
        <div>
          <div className='payment-section-title h3-class'>
            Detalhes do pagamento
          </div>
          <Grid container>
            <div className='gray-box'></div>
            <div className='gray-box'></div>
            <div className='gray-box'></div>
            <div className='gray-box'></div>
          </Grid>
          <div className='field-are'>
            <TextInput
              label='Número do cartão de crédito'
              name='card'
              mask='9999 9999 9999 9999 9999'
              error={inputs.card.errorMessage}
              value={inputs.card.value}
              onChange={inputChange}
              required={true}
            />

            <TextInput
              label='Nome impresso no cartão'
              name='fullName'
              error={inputs.fullName.errorMessage}
              value={inputs.fullName.value}
              onChange={inputChange}
              required={true}
            />

            <TextInput
              label='Data de validade'
              mask='99/9999'
              name='validity'
              error={inputs.validity.errorMessage}
              value={inputs.validity.value}
              onChange={inputChange}
              required={true}
            />

            <TextInput
              label='CVV'
              name='cvv'
              error={inputs.cvv.errorMessage}
              value={inputs.cvv.value}
              onChange={inputChange}
              required={true}
              mask='999'
            />

            <Grid container justifyContent='space-between'>
              <TextInput
                classes='half-width full-width-mobile'
                label='Endereço'
                name='address'
                error={inputs.address.errorMessage}
                value={inputs.address.value}
                onChange={inputChange}
                required={true}
              />
             
              <TextInput
                classes='half-width full-width-mobile'
                label='Número'
                name='number'
                error={inputs.number.errorMessage}
                value={inputs.number.value}
                onChange={inputChange}
                required={true}
              />
            </Grid>

            <Grid container justifyContent='space-between'>
              <TextInput
                classes='half-width full-width-mobile'
                label='Bairro'
                name='district'
                error={inputs.district.errorMessage}
                value={inputs.district.value}
                onChange={inputChange}
                required={true}
              />

              <TextInput
                classes='half-width full-width-mobile'
                label='Complemento (opcional)'
                name='complement'
                error={inputs.complement.errorMessage}
                value={inputs.complement.value}
                onChange={inputChange}
                required={true}
              />
            </Grid>

            <Grid container justifyContent='space-between'>
              <TextInput
                classes='half-width'
                label='Cidade'
                name='city'
                error={inputs.city.errorMessage}
                value={inputs.city.value}
                onChange={inputChange}
                required={true}
              />

              <SelectInput 
                classes='half-width state-select' 
                options={[{value: 'SP', label: 'SP'},{value: 'RJ', label: 'RJ'}]} 
                label='Estado' 
                value={inputs.state.value} 
                name='state' 
                required={true} 
                onChange={inputChange}
              />
            </Grid>

            <TextInput
              label='CEP'
              name='cep'
              error={inputs.cep.errorMessage}
              value={inputs.cep.value}
              onChange={inputChange}
              required={true}
              mask='99999-999'
            />

            <TextInput
              label='CPF'
              name='cpf'
              error={inputs.cpf.errorMessage}
              value={inputs.cpf.value}
              onChange={inputChange}
              required={true}
              mask='999.999.999-99'
            />

            <TextInput
              label='Data de nascimento'
              name='birthday'
              error={inputs.birthday.errorMessage}
              value={inputs.birthday.value}
              onChange={inputChange}
              required={true}
              mask='99/99/9999'
            />

            <TextInput
              label='Telefone'
              name='phone'
              error={inputs.phone.errorMessage}
              value={inputs.phone.value}
              onChange={inputChange}
              required={true}
              mask={phoneMask}
            />
          </div>
        </div>
      </Grid>
      <Grid 
        item 
        sm={4} 
        xs={12}
      >
        <PurchaseDetails isLoading={isLoading} errorMessage={submitError}/>
      </Grid>
    </form>
  );
};

export default PurchaseForm;
