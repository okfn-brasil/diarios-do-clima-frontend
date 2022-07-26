import { Dispatch, SetStateAction, useState } from 'react';
import ShowPassIcon from '@app/assets/images/icons/show-pass.svg';
import { InputModel, InputType } from '@app/models/forms.model';
import AccountService from '@app/services/accounts';
import TextInput from '@app/ui/components/forms/input/Input';
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

const ChangePasswordModal = ({isOpen, setLoading, onClose}: ChangePassword) => {
  const accountsService = new AccountService();
  const [passwords, setPasswords] : [Passwords, Dispatch<SetStateAction<Passwords>>] = useState({
    new: { value: '' },
    old: { value: '' },
  } as Passwords);
  const [error, setError] : [string, Dispatch<string>] = useState('');
  const [passFieldType, setPassType] : [boolean, Dispatch<boolean>] = useState(true);

  const onChangeInput = (event: InputType, valid?: boolean) => {
    const { value, name } = event.target;
    setPasswords((values: Passwords) => ({...values, [name]: { value, isValid: valid }}));
    setError('');
  };

  const submit = () => { // TO DO validação de senha antiga
    setLoading(true);
    accountsService.updateUserData({password: passwords.new.value}).then(() => {
      setLoading(false);
      onClose();
    }).catch(() => {
      setLoading(false);
      setError(TEXTS.myAccount.updatePassword);
    });
  };

  return (
    <EditDataModal
      isOpen={isOpen}
      onClose={onClose}
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
            onChange={onChangeInput} 
            label='Senha atual'
          />
        </div>

        <PasswordField 
          errorMessage={error} 
          value={passwords.new.value}
          placeholder='Nova senha'
          onChange={onChangeInput} 
          name='new' 
          classess='input-class'
        />
      </div>
    </EditDataModal>
  );
};

export default ChangePasswordModal;

