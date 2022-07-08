import {FormControl, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ShowPassIcon from '@app/assets/images/icons/show-pass.svg';
import { Dispatch, SetStateAction, useState } from "react";
import InputError from "@app/ui/components/inputError/inputError";
import './passwordField.scss';

interface PropsPasswordField {
  sx?: React.CSSProperties;
  placeholder?: string;
  onChange: Function;
  name: string;
  value: string;
  errorMessage?: string | boolean;
  classess?: string;
}

interface PasswordValidation {
  minLength: boolean;
  lettersAndNumbers: boolean;
  specials: boolean;
  uppercase: boolean;
}

const PasswordField = ({ sx, classess, value, name, errorMessage, onChange }: PropsPasswordField) => {
  const [fieldType, setType]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState(value);
  const [fieldValidation, setValidation]: [PasswordValidation, Dispatch<SetStateAction<PasswordValidation>>] = useState({
    minLength: false,
    lettersAndNumbers: false,
    specials: false,
    uppercase: false,
  } as PasswordValidation);

  const changeFieldType = () => {
    setType(!fieldType);
  }

  const inputChange = (event: any) => {
    const value = event.target.value;
    const validate = {
      minLength: value.length >= 8,
      lettersAndNumbers: /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value),
      specials: !!value.match(/[*,!.&%$#@]/),
      uppercase: !!value.match(/[A-Z]/g),
    };
    event.target.valid = validate.minLength && validate.lettersAndNumbers && validate.specials && validate.uppercase;
    setValidation(validate);
    setInputValue(value);
    onChange(event);
  }

  return (
    <>
      <div className='password-field'>
        <img className={'hover-animation ' + (fieldType ? 'low-opacity' : '')} src={ShowPassIcon} onClick={changeFieldType} />
        
        <FormControl className='form-input' fullWidth>
            <InputLabel id='senha'>Senha</InputLabel>
          <Input 
            type={fieldType ? 'password' : 'text'} 
            name={name} 
            value={inputValue} 
            className={`password-field ${classess}`}
            required 
            sx={sx}
            onChange={inputChange}
            error={!!errorMessage} 
          />
        </FormControl>
      </div>
      <InputError>{errorMessage}</InputError>

      <div className='validation'>
        <div className="validator">
          <div className="icon">{fieldValidation.minLength ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          Ter 8 ou mais caracteres
        </div>
        <div className="validator">
          <div className="icon">{fieldValidation.lettersAndNumbers ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          Conter letras e números
        </div>
        <div className="validator">
          <div className="icon">{fieldValidation.specials ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          Conter caracteres especiais (*,!.&%$#@)
        </div>
        <div className="validator">
          <div className="icon">{fieldValidation.uppercase ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          Conter uma letra maiúscula
        </div>
      </div>
    </>
  );
}

export default PasswordField;