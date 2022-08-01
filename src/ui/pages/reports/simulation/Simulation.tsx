import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { FieldValidation, InputModel, InputType } from '@app/models/forms.model';
import TextInput from '@app/ui/components/forms/input/Input';
import SelectInput from '@app/ui/components/forms/select/Select';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import { testEmail } from '@app/ui/utils/functions.utils';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import './Simulation.scss';

interface SimulationModel {
  email: InputModel;
  name: InputModel;
  categoria: InputModel;
  [key: string]: InputModel;
}

const fieldValidations: FieldValidation = {
  name: (value: string) => { return value && value.length < 8 ? 'O campo deve possuir no mínimo 8 caracteres' : false; },
  email: (value: string) => { return testEmail(value) ? false : 'O e-mail inserido é invalido'; },
};

const SimulationForm = () => {
  const [inputs, setInputs] : [SimulationModel, Dispatch<SetStateAction<SimulationModel>>] = useState({
    email: { value: '' },
    name: { value: '' },
    categoria: { value: '' },
  });

  const inputChange = (event: InputType) => {
    const {name, value} = event.target;
    setInputs((values: SimulationModel) => ({...values, [name]: {value}}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = [];
    Object.keys(inputs).forEach((key: string) => {
      const inputValue: string = inputs[key].value;
      const validator = fieldValidations[key] ? fieldValidations[key](inputValue) : false;
      if(inputValue) {
        setInputs((values: SimulationModel) => ({
          ...values,
          [key]: {value: inputValue, errorMessage: validator as string
          }}));
        if(typeof validator === 'string') {
          errors.push(key);
        }
      }
    });
    if(!errors.length) {
      // TO DO SIMULAÇÃO
    }
  };

  return (
    <Grid className='simulation-form'>
      <h3 className='h3-class-sx-margin'>{TEXTS.reportsPage.simulation.title}</h3>
      <p className='paragraph-class'>{TEXTS.reportsPage.simulation.subTitle}</p>

      <form onSubmit={handleSubmit}>
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
          value={inputs.name.value}
          required
          type='text'
          onChange={inputChange}
          name='name'
          label='Nome completo'
          error={inputs.name.errorMessage as string}
        />

        <SelectInput
          options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
          label='Categoria' 
          value={inputs.categoria.value} 
          name='categoria' 
          required={true} 
          onChange={inputChange}
        />

        <SubmitForm label='Solicitar uma proposta' classess='submit-simulation'/>
      </form>
    </Grid>
  );
};

export default SimulationForm;