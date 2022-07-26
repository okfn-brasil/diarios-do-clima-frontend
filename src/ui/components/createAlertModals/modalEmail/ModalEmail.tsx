import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AccountService from '@app/services/accounts';
import { userUpdate } from '@app/stores/user.store';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import TextInput from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

import Loading from '../../loading/Loading';

import './ModalEmail.scss';

interface ModalEmailProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (email: string) => void;
  userEmail: string;
  alertEmail: string;
}

const ModalEmail = ({isOpen, userEmail, alertEmail, onBack, onApply}: ModalEmailProps) => {
  const dispatch = useDispatch();
  const accountService = new AccountService();
  const [email, setEmail] : [string, Dispatch<string>] = useState('');
  const [hasError, setError] : [string, Dispatch<string>] = useState('');
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    setEmail(alertEmail || userEmail);
  }, [alertEmail, userEmail]);

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError('');
    setEmail(event.target.value);
  };

  const apply = () => {
    if(/\S+@\S+\.\S+/.test(email)) {
      setError('');
      setLoading(true);
      accountService.updateUserData({ alert_email: email}).then(() => {
        dispatch(userUpdate({
          alert_email: email,
        }));
        onApply(email);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
        setError(TEXTS.editEmail.apiError);
      });
    } else {
      setError(TEXTS.editEmail.invalidError);
    }
  };

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === 'Enter' ? apply() : null;
  };

  return (
    <>
      <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
        <div className='modal-email' onKeyUp={keyUp}>
          <div className='paragraph-class'>{TEXTS.editEmail.title}</div>
          <div className='paragraph-class'>{TEXTS.editEmail.subtitle} <b>{userEmail}</b></div>
          <TextInput 
            value={email}
            required
            type='email'
            onChange={inputChange}
            name='email'
            label={TEXTS.editEmail.inputLabel}
          />
          <InputError >{ hasError }</InputError>
          <ButtonGreen disabled={(hasError === TEXTS.editEmail.invalidError) || !email} classess='button-apply-email' fullWidth onClick={apply}>{TEXTS.editEmail.submit}</ButtonGreen>
          <Loading isLoading={isLoading}/>
        </div>
      </Modal>
    </>
  );
};

export default ModalEmail;
