import { ChangeEvent } from 'react';
import InputMask from 'react-input-mask';
import InputError from '@app/ui/components/forms/inputError/inputError';
import { FormControl, Input, InputLabel } from '@mui/material';

interface PropsInput {
  value: string;
  required?: boolean;
  classes?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  name: string;
  label: string;
  mask?: string;
  error?: JSX.Element | string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  id?: string;
}

  const TextInput = ({id, value, autoComplete, disabled, required, classes, onBlur, onChange, name, label, type, error, mask}: PropsInput) => {
  return (
    <FormControl className={`form-input ${classes}`} fullWidth>
      <InputLabel for={id} id={name}>{label}</InputLabel>
      {mask ? 
        <InputMask mask={mask} value={value} onChange={onChange}>
          {() => <Input 
            required={required}
            error={!!error} 
            type={type || 'text'}
            name={name}
            className='input-class'
            disabled={disabled}
            id={id}
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
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          id={id}
        />
      }
      <InputError>{error}</InputError>
    </FormControl>


  );
};

export default TextInput;