import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import SubmitForm from '/src/ui/components/submitForm/SubmitForm';
import { black } from '/src/ui/utils/colors';
import { h3Style, paragraphStyle } from '/src/ui/utils/generalStyles';
import { selectIcon } from '/src/ui/utils/forms.utils';

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

  const inputChange = (event: any) => {
    const {name, value} = event.target;
    setInputs((values: SimulationModel) => ({...values, [name]: value}));
  }

  const handleSubmit = () => {

  }

  return (
    <Grid>
      <h3 style={{...h3Style, margin: '0'}}>Simular o valor do relatório</h3>
      <p style={{...paragraphStyle, margin: '8px 0 0'}}>Você pode encomendar um relatório personalizado. Preencha o formulário abaixo para receber uma cotação.</p>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth style={{marginTop: '30px'}} className='form-select'>
            <InputLabel id='criterio1-select'>critério 1</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='criterio1-select' value={inputs.criterio1} name='criterio1' onChange={inputChange} >
              <MenuItem value={0} disabled>Selecione um critério</MenuItem>
              <MenuItem value={'x'}>x</MenuItem>
              <MenuItem value={'y'}>y</MenuItem>
              <MenuItem value={'z'}>z</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{marginTop: '30px'}} className='form-select'>
            <InputLabel id='criterio2-select'>critério 2</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='criterio2-select' value={inputs.criterio2} name='criterio2' onChange={inputChange} >
              <MenuItem value={0} disabled>Selecione um critério</MenuItem>
              <MenuItem value={'x'}>x</MenuItem>
              <MenuItem value={'y'}>y</MenuItem>
              <MenuItem value={'z'}>z</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{marginTop: '30px'}} className='form-select'>
            <InputLabel id='criterio3-select'>critério 3</InputLabel>
            <Select required variant='standard' IconComponent={selectIcon} labelId='criterio3-select' value={inputs.criterio3} name='criterio3' onChange={inputChange} >
              <MenuItem value={0} disabled>Selecione um critério</MenuItem>
              <MenuItem value={'x'}>x</MenuItem>
              <MenuItem value={'y'}>y</MenuItem>
              <MenuItem value={'z'}>z</MenuItem>
            </Select>
          </FormControl>

          <div>
            <p style={{...paragraphStyle, color: black, marginTop: '22px', marginBottom: '8px'}}>Valor estimado</p>
            <p style={{fontSize: '38px', lineHeight: '45px', color: black, margin: '0'}}>R$ 0</p>
          </div>

          <SubmitForm label='Solicitar uma proposta' sx={{width: 'unset', marginTop: '22px'}}/>
      </form>
    </Grid>
  );
}

export default SimulationForm;