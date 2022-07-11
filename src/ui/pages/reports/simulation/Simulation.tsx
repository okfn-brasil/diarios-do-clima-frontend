import { Grid, SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import SelectInput from '@app/ui/components/forms/select/Select';
import './Simulation.scss';

interface SimulationModel {
  criterio1: string;
  criterio2: string;
  criterio3: string;
}

const SimulationForm = () => {
  const [inputs, setInputs] : [SimulationModel, Dispatch<SetStateAction<SimulationModel>>] = useState({
    criterio1: '',
    criterio2: '',
    criterio3: '',
  });

  const inputChange = (event: SelectChangeEvent<string>) => {
    const {name, value} = event.target;
    setInputs((values: SimulationModel) => ({...values, [name]: value}));
  }

  const handleSubmit = () => {

  }

  return (
    <Grid className='simulation-form'>
      <h3 className='h3-style-sx-margin'>Simular o valor do relatório</h3>
      <p className='paragraph-style'>Você pode encomendar um relatório personalizado. Preencha o formulário abaixo para receber uma cotação.</p>

      <form onSubmit={handleSubmit}>
          <SelectInput
            options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
            label='critério 1' 
            value={inputs.criterio1} 
            name='criterio1' 
            required={true} 
            onChange={inputChange}
          />

          <SelectInput
            options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
            label='critério 2' 
            value={inputs.criterio2} 
            name='criterio2' 
            required={true} 
            onChange={inputChange}
          />

          <SelectInput
            options={[{value: 'x', label: 'x'},{value: 'y', label: 'y'}]} 
            label='critério 3' 
            value={inputs.criterio3} 
            name='criterio3' 
            required={true} 
            onChange={inputChange}
          />
          <div>
            <p className='paragraph-style value-simulated'>Valor estimado</p>
            <div className='value'>R$ 0</div>
          </div>

          <SubmitForm label='Solicitar uma proposta' classess='submit-simulation'/>
      </form>
    </Grid>
  );
}

export default SimulationForm;