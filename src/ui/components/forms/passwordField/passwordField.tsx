import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ShowPassIcon from '@app/assets/images/icons/show-pass.svg';
import { InputType } from '@app/models/forms.model';
import TextInput from '@app/ui/components/forms/input/Input';
import { TEXTS } from '@app/ui/utils/portal-texts';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import './passwordField.scss';

interface PropsPasswordField {
  placeholder?: string;
  onChange: (e: InputType, v: boolean) => void;
  name: string;
  value: string;
  errorMessage?: string | boolean;
  classess?: string;
  id?: string;
}

interface PasswordValidation {
  minLength: boolean;
  lettersAndNumbers: boolean;
  specials: boolean;
  uppercase: boolean;
  placeholder?: string;
}

const PasswordField = ({ id, classess, placeholder, value, name, errorMessage, onChange }: PropsPasswordField) => {
  const [fieldType, setType]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState(value);
  const [fieldValidation, setValidation]: [PasswordValidation, Dispatch<SetStateAction<PasswordValidation>>] = useState({
    minLength: false,
    lettersAndNumbers: false,
    specials: false,
    uppercase: false,
  } as PasswordValidation);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const changeFieldType = () => {
    setType(!fieldType);
  };

  const inputChange = (event: InputType) => {
    const value = event.target.value;
    const validate = {
      minLength: value.length >= 8,
      lettersAndNumbers: /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value),
      specials: !!value.match(/[*,!.&%$#@]/),
      uppercase: !!value.match(/[A-Z]/g),
    };
    const valid = validate.minLength && validate.lettersAndNumbers && validate.specials && validate.uppercase;
    setValidation(validate);
    setInputValue(value);
    onChange(event, valid);
  };

  return (
    <>
      <div className='password-field'>
        <img className={'hover-animation ' + (fieldType ? 'low-opacity' : '')} src={ShowPassIcon} onClick={changeFieldType} />
        
        <TextInput
          id={id}
          label={placeholder || 'Senha'}
          name={name}
          error={errorMessage as string}
          value={inputValue}
          onChange={inputChange}
          required={true}
          classes={`password-field ${classess}`}
          type={fieldType ? 'password' : 'text'} 
        />
      </div>

      <div className='validation'>
        <div className='validator'>
          <div className='icon'>{fieldValidation.minLength ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          {TEXTS.passwordValidation.eightChars}
        </div>
        <div className='validator'>
          <div className='icon'>{fieldValidation.lettersAndNumbers ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          {TEXTS.passwordValidation.lettersAndNumbers}
        </div>
        <div className='validator'>
          <div className='icon'>{fieldValidation.specials ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          {TEXTS.passwordValidation.specialChars}
        </div>
        <div className='validator'>
          <div className='icon'>{fieldValidation.uppercase ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}</div>
          {TEXTS.passwordValidation.uppercaseChar}
        </div>
      </div>
    </>
  );
};

export default PasswordField;