import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Theme } from '@app/models/filters.model';
import { FieldValidation, InputModel, InputType } from '@app/models/forms.model';
import ThemeFilter from '@app/ui/components/filters/themeFilter/ThemeFilter';
import TextInput from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import SelectInput from '@app/ui/components/forms/select/Select';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import { getInputWithoutMask, homePhoneMask, inputValidation, mobilePhoneMask } from '@app/ui/utils/form.utils';
import { testEmail } from '@app/ui/utils/functions.utils';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import './Simulation.scss';

interface MultipleSelect {
  value: string[];
  errorMessage?: string | boolean;
}

interface SimulationModel {
  email: InputModel;
  name: InputModel;
  phone: InputModel;
  cities: MultipleSelect;
  horizon: InputModel;
  [key: string]: InputModel | MultipleSelect;
}

const fieldValidations: FieldValidation = {
  name: (value: string) => { return value && value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
  email: (value: string) => { return testEmail(value) ? false : 'O e-mail inserido é invalido'; },
  phone: (value: string) => { return inputValidation(value, 11, 'O número de telefone inserido é inválido');},
  horizon: (value: string) => { return value && value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
};

const SimulationForm = () => {
  const [inputs, setInputs] : [SimulationModel, Dispatch<SetStateAction<SimulationModel>>] = useState({
    email: { value: '' },
    name: { value: '' },
    cities: { value: [] as string[] },
    phone: { value: '' },
    horizon: { value: '' },
  });
  const [themes, setThemes] : [Theme, Dispatch<SetStateAction<Theme>>] = useState({});
  const [themeError, setThemeError] : [string, Dispatch<SetStateAction<string>>] = useState('');
  const [phoneMask, setPhoneMask] : [string, Dispatch<SetStateAction<string>>] = useState(homePhoneMask);

  const inputChange = (event: InputType) => {
    const {name, value} = event.target;
    getPhoneMask(name, value);
    setInputs((values: SimulationModel) => ({...values, [name]: {value}}));
  };

  const getPhoneMask = (name: string, value: string) => {
    if(name === 'phone') {
      const phoneLength = getInputWithoutMask(value).length;
      setPhoneMask(phoneLength <= 11 ? homePhoneMask : mobilePhoneMask);
    }
  };

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setThemes((values: Theme) => ({
      ...values,
      [name]: checked,
    }));
  };

  const checkSubThemes = () => {
    return !!(Object.keys(themes).filter(theme => !!themes[theme]).length);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = [];

    if(!checkSubThemes()) {
      const themeErrorMessage = 'Selecione pelo menos um tema';
      setThemeError(themeErrorMessage);
      errors.push(themeErrorMessage);
    } else {
      setThemeError('');
    }

    Object.keys(inputs).forEach((key: string) => {
      const inputValue: (string | string[]) = inputs[key].value;
      const validator = fieldValidations[key] ? fieldValidations[key](inputValue as string) : false;
      if(inputValue && inputValue.length) {
        setInputs((values: SimulationModel) => ({
          ...values,
          [key]: {value: inputValue as string, errorMessage: validator as string
          }}));
        if(typeof validator === 'string') {
          errors.push(key);
        }
      }
    });
    if(!errors.length) {
      submit();
    }
  };

  const submit = () => {
    // TO DO
  };

  return (
    <Grid className='simulation-form'>
      <h3 className='h3-class-sx-margin'>{TEXTS.reportsPage.simulation.title}</h3>
      <p className='paragraph-class'>{TEXTS.reportsPage.simulation.subTitle}</p>

      <form onSubmit={handleSubmit}>
        <TextInput 
          value={inputs.name.value}
          required
          type='text'
          onChange={inputChange}
          name='name'
          label='Nome completo'
          error={inputs.name.errorMessage as string}
        />

        <TextInput 
          value={inputs.email.value}
          required
          type='email'
          onChange={inputChange}
          name='email'
          label='E-mail'
          error={inputs.email.errorMessage as string}
        />

        <TextInput
          label={TEXTS.purchasePage.labels.phone}
          name='phone'
          error={inputs.phone.errorMessage}
          value={inputs.phone.value}
          onChange={inputChange}
          required={true}
          mask={phoneMask}
        />

        <SelectInput
          options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
          label='Cidades de interesse' 
          value={inputs.cities.value} 
          multiple
          name='cities' 
          required={true} 
          onChange={inputChange}
        />

        <TextInput 
          value={inputs.horizon.value}
          required
          onChange={inputChange}
          name='horizon'
          label='Horizonte temporal'
          error={inputs.horizon.errorMessage as string}
        />

        <div>
          <ThemeFilter
            hasProPlan
            themesFilter={themes}
            onChange={onChangeTheme}
          />
          <InputError>{themeError}</InputError>
        </div>

        <SubmitForm label='Solicitar uma proposta' classess='submit-simulation'/>
      </form>
    </Grid>
  );
};

export default SimulationForm;