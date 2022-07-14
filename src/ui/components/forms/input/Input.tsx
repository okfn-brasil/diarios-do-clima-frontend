import { FormControl, InputLabel, Input } from '@mui/material';
import InputError from '../inputError/inputError';
import InputMask from 'react-input-mask';
import { ChangeEvent } from 'react';

interface PropsInput {
  value: string;
  required?: boolean;
  classes?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
            className='input-class'
          />}
        </InputMask>
        :
        <Input 
          required={required}
          error={!!error} 
          type={type || 'text'}
          name={name}
          className='input-class'
          value={value} 
          onChange={onChange}
        />
      }
      <InputError>{error}</InputError>
    </FormControl>


  );
}

export default TextInput;