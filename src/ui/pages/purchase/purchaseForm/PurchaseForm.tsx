import { darkBlue, gray1 } from '/src/ui/utils/colors';
import { fontSora } from '/src/ui/utils/fonts';
import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material';
import InputError from '/src/ui/components/inputError/inputError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { inputStyle } from '/src/ui/utils/generalStyles';
import { InputModel } from '/src/models/forms.model';
import { FormPurchaseModel } from '/src/models/purchase.model';
import { selectIcon } from '/src/ui/utils/forms.utils';
import './PurchaseForm.scss';
import PurchaseDetails from '../purchaseDetails/PurchaseDetails';
import InputMask from 'react-input-mask';
import Loading from '/src/ui/components/loading/Loading';
import PurchaseSubmit from '../purchaseSubmit/PurchaseSubmit';
import BillingService, { getCardType } from '/src/services/billing';
import { useDispatch } from 'react-redux';
import { userUpdate } from '/src/stores/user.store';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { urls } from '/src/ui/utils/urls';

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
};

const validateDate = (value: string, minMaxValidation: Function) => {
  if(!value) { return }
  const dateArray = value.split('/');
  const year = dateArray[dateArray.length - 1];
  const month = dateArray[dateArray.length - 2];
  const day = dateArray[dateArray.length - 3] || 1;
  const newDate: any = new Date(`${month}/${day}/${year}`);
  return newDate.toString() === 'Invalid Date' || minMaxValidation(newDate) ? 'A data inserida é inválida' : false;
}

const getCardValue = (value: string) => {
  return getInputWithoutMask(value.replace(/ /g,''))
}

const getInputWithoutMask = (value: string) => {
  const newValue = value.replace(/[&\/\\#,+()$~%!.„'":*‚^_¤?<>|@ª{«»§}©®™]/g, '').replace('-', '');
  return newValue;
}

const inputValidation = (value: string, minSize: number, text: string) => {
  return value && getInputWithoutMask(value).length < minSize ? text : false;
}

const cardValidation = (value: string, text: string) => {
  return !getCardType(getCardValue(value)) ? text : false;
}

const fieldValidations: any = {
  card: (s: InputModel) => { return cardValidation(s.value, 'O cartão inserido é inválido')},
  fullName: (s: InputModel) => { return inputValidation(s.value, 8, 'O campo deve possuir no mínimo 8 caracteres')},
  cvv: (s: InputModel) => { return inputValidation(s.value, 3, 'O CVV inserido é inválido')},
  address: (s: InputModel) => { return inputValidation(s.value, 5, 'O campo deve possuir no mínimo 5 caracteres')},
  city: (s: InputModel) => { return inputValidation(s.value, 5, 'O campo deve possuir no mínimo 5 caracteres')},
  cep: (s: InputModel) => { return inputValidation(s.value, 8, 'O CEP inserido é inválido')},
  cpf: (s: InputModel) => { return inputValidation(s.value, 11, 'O CPF inserido é inválido')},
  phone: (s: InputModel) => { return inputValidation(s.value, 11, 'O número de telefone inserido é inválido')},
  birthday: (s: InputModel) => { return validateDate(s.value, (value: Date) => !(new Date() > value))},
  validity: (s: InputModel) => { return validateDate(s.value, (value: Date) => !(new Date() < value))},
}
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
  }, []);

  const getPhoneMask = (name: string, value: string) => {
    if(name === 'phone') {
      const phoneLength = getInputWithoutMask(value).length;
      setPhoneMask(phoneLength <= 11 ? homePhoneMask : mobilePhoneMask);
    }
  }

  const inputChange = (event: any) => {
    const {name, value} = event.target;
    getPhoneMask(name, value);
    setInputs((values: FormPurchaseModel) => ({...values, [name]: { value: value, isValid: values[name].isValid }}));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitError(emptyError);
    let errors = [];
    Object.keys(inputs).forEach((key: string) => {
      let input: InputModel = inputs[key];
      let validator: any = fieldValidations[key] ? fieldValidations[key](input) : false;
      if(inputs[key].value) {
        setInputs((values: FormPurchaseModel) => ({...values, [key]: {...input, errorMessage: validator}}))
        if(typeof validator === 'string' || validator instanceof String) {
          errors.push(key);
        }
      }
    });
    if(!errors.length) {
      const newInputs: FormPurchaseModel = {} as FormPurchaseModel;
      Object.keys(inputs).forEach((key: string) => {
        newInputs[key] = { value: key === 'card' ? getCardValue(inputs[key].value): getInputWithoutMask(inputs[key].value)}
      });
      setSubmitForm(newInputs);
      setLoading(true);
    }
  }

  const onError = (errorMessage: JSX.Element) => {
    setLoading(false);
    setSubmitError(errorMessage);
  }

  const onSuccess = (response: string) => {
    dispatch(userUpdate({
      plan_pro: response,
    }));
    navigate(urls.startSearch.url)
  }

  return (
    <form 
      className='purchase-form'
      style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}
      onSubmit={handleSubmit}
    >
      <PurchaseSubmit phoneMethod={phoneMethod as any} addressMethod={addressMethod as any} isSubmitting={isLoading} onSuccess={onSuccess} onError={onError} form={submitForm} />
      <Loading isLoading={isLoading}></Loading>
      <Grid item sm={7} xs={12}>
        <div>
          <div 
            style={{
              ...fontSora,
              fontSize: '22px',
              fontWeight: '600',
              lineHeight: '28px',
              color: darkBlue,
            }}
          >
            Detalhes do pagamento
          </div>
          <Grid container style={{marginTop: '24px'}}>
            <div style={grayBoxStyle}></div>
            <div style={grayBoxStyle}></div>
            <div style={grayBoxStyle}></div>
            <div style={grayBoxStyle}></div>
          </Grid>
          <div style={{marginBottom: '80px'}}>
            <FormControl className='form-input' fullWidth>
              <InputLabel id='card'>Número do cartão de crédito</InputLabel>
              <InputMask mask='9999 9999 9999 9999 9999' value={inputs.card.value} onChange={inputChange}>
                {() => <Input 
                  required
                  error={!!inputs.card.errorMessage} 
                  type='text'
                  name='card'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.card.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='fullName'>Nome impresso no cartão</InputLabel>
              <Input  
                required
                error={!!inputs.fullName.errorMessage} 
                type='text' 
                value={inputs.fullName.value}
                name='fullName'
                onChange={inputChange}
                sx={purchaseInputStyle}
              />
              <InputError>{inputs.fullName.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='validity'>Data de validade</InputLabel>
              <InputMask mask='99/9999' value={inputs.validity.value} onChange={inputChange}>
                {() => <Input 
                  required
                  error={!!inputs.validity.errorMessage} 
                  type='text' 
                  name='validity'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.validity.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='cvv'>CVV</InputLabel>
              <InputMask mask='999' value={inputs.cvv.value} onChange={inputChange}>
                {() =><Input 
                  required
                  error={!!inputs.cvv.errorMessage} 
                  type='text' 
                  name='cvv'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.cvv.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='address'>Endereço</InputLabel>
              <Input 
                required
                error={!!inputs.address.errorMessage} 
                type='text' 
                value={inputs.address.value}
                name='address'
                onChange={inputChange}
                sx={purchaseInputStyle}/>
              <InputError>{inputs.address.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='city'>Cidade</InputLabel>
              <Input 
                required
                error={!!inputs.city.errorMessage} 
                type='text' 
                value={inputs.city.value}
                name='city'
                onChange={inputChange}
                sx={purchaseInputStyle}/>
              <InputError>{inputs.city.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-select' fullWidth sx={{marginTop: '10px'}}>
              <InputLabel id='state'>Estado</InputLabel>
              <Select 
                required
                variant='standard' 
                IconComponent={selectIcon} 
                labelId='state' 
                value={inputs.state.value} 
                name='state' 
                onChange={inputChange} 
                label='Estado'
              >
                <MenuItem value={0} disabled>Selecione um estado</MenuItem>
                <MenuItem value={'SP'}>SP</MenuItem>
                <MenuItem value={'RJ'}>RJ</MenuItem>
                <MenuItem value={'MG'}>MG</MenuItem>
            </Select>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='cep'>CEP</InputLabel>
              
              <InputMask mask='99999-999' value={inputs.cep.value} onChange={inputChange}>
                {() => <Input 
                  required
                  error={!!inputs.cep.errorMessage} 
                  type='text'
                  name='cep'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.cep.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='cpf'>CPF</InputLabel>
              <InputMask mask='999.999.999-99' value={inputs.cpf.value} onChange={inputChange}>
                {() => <Input 
                  required
                  error={!!inputs.cpf.errorMessage} 
                  type='text' 
                  name='cpf'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.cpf.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='birthday'>Data de nascimento</InputLabel>
              <InputMask mask='99/99/9999' value={inputs.birthday.value} onChange={inputChange}>
                {() => <Input 
                  required
                  error={!!inputs.birthday.errorMessage} 
                  type='text' 
                  name='birthday'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.birthday.errorMessage}</InputError>
            </FormControl>

            <FormControl className='form-input' fullWidth>
              <InputLabel id='phone'>Telefone</InputLabel>
              <InputMask mask={phoneMask} value={inputs.phone.value} onChange={inputChange}>
                {() => <Input 
                  required
                  error={!!inputs.phone.errorMessage} 
                  type='text' 
                  name='phone'
                  sx={purchaseInputStyle}
                />}
              </InputMask>
              <InputError>{inputs.phone.errorMessage}</InputError>
            </FormControl>
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
}

export default PurchaseForm;

const grayBoxStyle: React.CSSProperties = {
  width: '32px',
  height: '22px',
  backgroundColor: gray1,
  borderRadius: '4px',
  marginRight: '8px',
}

const purchaseInputStyle = {
  ...inputStyle,
  padding: '26px 0 0px 2px'
}
