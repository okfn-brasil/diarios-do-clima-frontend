import { Dispatch, SetStateAction, useState } from 'react';
import ShowPassIcon from '@app/assets/images/icons/show-pass.svg';
import { InputModel, InputType } from '@app/models/forms.model';
import AccountService from '@app/services/accounts';
import TextInput from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import PasswordField from '@app/ui/components/forms/passwordField/passwordField';
import { TEXTS } from '@app/ui/utils/portal-texts';

import EditDataModal from '../editDataModal/EditDataModal';

import './ChangePassword.scss';

interface Passwords {
  new: InputModel;
  old: InputModel;
}

interface ChangePassword {
  isOpen: boolean;
  onClose: () => void;
  setLoading: (e: boolean) => void;
}

const initialPasswords: Passwords = {
  new: { value: '' },
  old: { value: '' },
};

const ChangePasswordModal = ({isOpen, setLoading, onClose}: ChangePassword) => {
  const accountsService = new AccountService();
  const [passwords, setPasswords] : [Passwords, Dispatch<SetStateAction<Passwords>>] = useState(initialPasswords);
  const [error, setError] : [string, Dispatch<string>] = useState('');
  const [passFieldType, setPassType] : [boolean, Dispatch<boolean>] = useState(true);

  const onChangeInput = (event: InputType, valid?: boolean) => {
    const { value, name } = event.target;
    setPasswords((values: Passwords) => ({...values, [name]: { value, isValid: valid }}));
    setError('');
  };

  const submit = () => {
    setLoading(true);
    accountsService.updateUserPassword({
      old_password: passwords.old.value,
      new_password1: passwords.new.value,
      new_password2: passwords.new.value,
    }).then(() => {
      setLoading(false);
      closeModal();
    }).catch(error => {
      const errorKey = error ? Object.keys(error)[0] : '';
      setLoading(false);
      setPasswords(initialPasswords);
      setError(error[errorKey] ? error[errorKey][0] : TEXTS.myAccount.updatePassword);
    });
  };

  const closeModal = () => {
    setError('');
    setPasswords(initialPasswords);
    onClose();
  };

  return (
    <EditDataModal
      isOpen={isOpen}
      onClose={closeModal}
      modalTitle={TEXTS.myAccount.updatePasswordTitle}
      onSubmit={submit}
      submitLabel={TEXTS.myAccount.savePassword}
      disabled={!passwords.old.value || !passwords.new.isValid}
    >
      <div className="change-password-fields">
        <div className='password-field'>
          <img 
            className={'hover-animation ' + (passFieldType ? 'low-opacity' : '')} 
            src={ShowPassIcon} 
            onClick={() => setPassType(!passFieldType)} 
          />
          <TextInput
            required 
            type={passFieldType ? 'password' : 'text'} 
            value={passwords.old.value}
            name='old'
            autoComplete='off'
            onChange={onChangeInput} 
            label='Senha atual'
          />
        </div>

        <PasswordField 
          value={passwords.new.value}
          placeholder='Nova senha'
          onChange={onChangeInput} 
          name='new' 
          classes='input-class'
        />
        <InputError>{error}</InputError>
      </div>
    </EditDataModal>
  );
};

export default ChangePasswordModal;

