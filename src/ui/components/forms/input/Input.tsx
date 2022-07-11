import { FormControl, InputLabel, Input } from '@mui/material';
import InputError from '../inputError/inputError';
import InputMask from 'react-input-mask';

interface PropsInput {
  value: string;
  required?: boolean;
  classes?: string;
  onChange: any;
  name: string;
  label: string;
  mask?: string;
  error?: JSX.Element | string;
  type?: string;
}

const TextInput = ({value, required, classes, onChange, name, label, type, error, mask}: PropsInput) => {
  return (
    <FormControl className={`form-input ${classes}`} fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      {mask ? 
        <InputMask mask={mask} value={value} onChange={onChange}>
          {() => <Input 
            required={required}
            error={!!error} 
            type={type || 'text'}
            name={name}
            className='input-style'
          />}
        </InputMask>
        :
        <Input 
          required={required}
          error={!!error} 
          type={type || 'text'}
          name={name}
          className='input-style'
          value={value} 
          onChange={onChange}
        />
      }
      <InputError>{error}</InputError>
    </FormControl>


  );
}

export default TextInput;