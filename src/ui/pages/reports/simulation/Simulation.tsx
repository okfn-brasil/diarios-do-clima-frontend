import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { CheckBoxFilter } from '@app/models/filters.model';
import { FieldValidation, InputModel, InputType } from '@app/models/forms.model';
import { Option } from '@app/models/forms.model';
import { QuotationPostModel } from '@app/models/reports.model';
import CitiesService from '@app/services/cities';
import ReportsService from '@app/services/reports';
import ThemeFilter from '@app/ui/components/filters/themeFilter/ThemeFilter';
import TextInput from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import SelectWithSearch from '@app/ui/components/forms/selectWithSearch/SelectWithSearch';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import Loading from '@app/ui/components/loading/Loading';
import { getInputWithoutMask, homePhoneMask, inputValidation, mobilePhoneMask } from '@app/ui/utils/form.utils';
import { testEmail } from '@app/ui/utils/functions.utils';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import ModalSubmitted from '../modalSubmitted/ModalSubmitted';

import './Simulation.scss';

interface MultipleSelect {
  value: string[];
  errorMessage?: string | boolean;
}

interface SimulationModel {
  email: InputModel;
  name: InputModel;
  phone: InputModel;
  description: InputModel;
  cities: MultipleSelect;
  horizon: InputModel;
  [key: string]: InputModel | MultipleSelect;
}

const initialValue = {
  email: { value: '' },
  name: { value: '' },
  phone: { value: '' },
  description: { value: '' },
  cities: { value: [] as string[] },
  horizon: { value: '' },
};

const fieldValidations: FieldValidation = {
  name: (value: string) => { return value && value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
  email: (value: string) => { return testEmail(value) ? false : 'O e-mail inserido é invalido'; },
  phone: (value: string) => { return inputValidation(value, 11, 'O número de telefone inserido é inválido');},
  description: (value: string) => { return value && value.length < 50 ? 'O campo deve possuir no mínimo 50 caracteres' : false; },
  horizon: (value: string) => { return value && value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
};

const SimulationForm = () => {
  const [inputs, setInputs] : [SimulationModel, Dispatch<SetStateAction<SimulationModel>>] = useState(initialValue);
  const [selectedCities, setCities] : [string[], Dispatch<SetStateAction<string[]>>] = useState([] as string[]);
  const [themes, setThemes] : [CheckBoxFilter, Dispatch<SetStateAction<CheckBoxFilter>>] = useState({});
  const [themeError, setThemeError] : [string, Dispatch<SetStateAction<string>>] = useState('');
  const [phoneMask, setPhoneMask] : [string, Dispatch<SetStateAction<string>>] = useState(homePhoneMask);
  const [citiesList, setCitiesList]: [Option[], Dispatch<SetStateAction<Option[]>>] = useState([] as Option[]);
  const [submitError, setSubmitError] : [string, Dispatch<SetStateAction<string>>] = useState('');
  const [submitted, setSubmittted] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isLoading, setLoading] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [resetCities, setResetCities] : [number, Dispatch<SetStateAction<number>>] = useState(0);
  const citiesService = new CitiesService();
  const reportsService = new ReportsService();

  useEffect(() => {
    citiesService.getAll().then(response => {
      const newCities = response.data.cities.map(city => { return {
        value: city.territory_id,
        label: `${city.territory_name} (${city.state_code})`,
      };}).sort((a, b) => a.label.localeCompare(b.label));
      setCitiesList(newCities);
    });
  }, []);

  const inputChange = (event: InputType) => {
    const {name, value} = event.target;
    getPhoneMask(name, value);
    setInputs((values: SimulationModel) => ({...values, [name]: {value}}));
  };

  const selectChange = (event: InputType) => {
    const {name, value} = event.target;
    if(!selectedCities.includes(value)) {
      const newCities = [...selectedCities, value];
      setCities(newCities);
      setInputs((values: SimulationModel) => ({...values, [name]: {value: newCities}}));
    }
  };

  const getPhoneMask = (name: string, value: string) => {
    if(name === 'phone') {
      const phoneLength = getInputWithoutMask(value).length;
      setPhoneMask(phoneLength <= 11 ? homePhoneMask : mobilePhoneMask);
    }
  };

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setThemes((values: CheckBoxFilter) => ({
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

  const onRemoveCity = (id: string) => {
    let newCities = [...selectedCities];
    newCities = newCities.filter(function(item) {
      return item !== id;
    });
    setCities(newCities);
  };

  const submit = () => {
    setLoading(true);
    setSubmitError('');
    const message: QuotationPostModel = {
      email: inputs.email.value,
      name: inputs.name.value,
      message: TEXTS.reportsPage.simulation.message(inputs.phone.value, inputs.description.value, inputs.horizon.value, selectedCities, themes)
    };
    reportsService.postQuotation(message).then(() => {
      setInputs(initialValue);
      setThemes({});
      setCities([]);
      setSubmittted(true);
      setLoading(false);
      setResetCities(Math.random());
    }).catch(() => {
      setSubmitError(TEXTS.reportsPage.simulation.submitError);
      setLoading(false);
    });
  };

  return (
    <Grid className='simulation-form'>
      <Loading isLoading={isLoading} />
      <ModalSubmitted isOpen={submitted} onClose={() => setSubmittted(false)} />
      <h3 className='h3-class-sx-margin'>{TEXTS.reportsPage.simulation.title}</h3>
      <p className='paragraph-class'>{TEXTS.reportsPage.simulation.subTitle}</p>

      <form onSubmit={handleSubmit}>
        <TextInput 
          value={inputs.name.value}
          required
          type='text'
          onChange={inputChange}
          name='name'
          id='name-simulation'
          label='Nome completo'
          error={inputs.name.errorMessage as string}
        />

        <TextInput 
          value={inputs.email.value}
          required
          type='email'
          onChange={inputChange}
          name='email'
          id='email-simulation'
          label='E-mail'
          error={inputs.email.errorMessage as string}
        />

        <TextInput
          label={TEXTS.purchasePage.labels.phone}
          name='phone'
          id='phone-simulation'
          error={inputs.phone.errorMessage}
          value={inputs.phone.value}
          onChange={inputChange}
          required={true}
          mask={phoneMask}
        />

        <TextInput 
          value={inputs.description.value}
          required
          onChange={inputChange}
          name='description'
          label='Descrição'
          error={inputs.description.errorMessage as string}
        />

        <div>
          <SelectWithSearch
            showAlways={true}
            options={citiesList} 
            label='Cidades de interesse (comece a digitar para encontrar cidades)'
            value={inputs.cities.value}
            name='cities'
            resetField={resetCities}
            onChangeSelect={selectChange}
          />
          <div className='selected-cities'>
            {selectedCities.filter(city => !!city).map(city => 
              <div className='selected-city' key={city} onClick={() => onRemoveCity(city)}>{citiesList.find(curr => curr.value === city)?.label}{city}  x</div>
            )}
          </div>
        </div>

        <TextInput 
          value={inputs.horizon.value}
          required
          onChange={inputChange}
          name='horizon'
          label='Horizonte temporal (data inicial a data final)'
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

        <SubmitForm label='Solicitar orçamento' disabled={isLoading} classes='submit-simulation'/>
        <InputError>{submitError}</InputError>
      </form>
    </Grid>
  );
};

export default SimulationForm;