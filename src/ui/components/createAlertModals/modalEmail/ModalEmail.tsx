import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import TextInput from '@app/ui/components/forms/input/Input';
import InputError from '@app/ui/components/forms/inputError/inputError';
import Modal from '@app/ui/components/modal/Modal';

import './ModalEmail.scss';

interface ModalEmailProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (kewWords: string) => void;
  userEmail: string;
}

const ModalEmail = ({isOpen, userEmail, onBack, onApply}: ModalEmailProps) => {
  const [email, setEmail] : [string, Dispatch<string>] = useState('');
  const [hasError, setError] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    setEmail(userEmail || '');
  }, [userEmail]);

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false);
    setEmail(event.target.value);
  };

  const apply = () => {
    if(/\S+@\S+\.\S+/.test(email)) {
      setError(false);
      onApply(email);
    } else {
      setError(true);
    }
  };

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === 'Enter' ? apply() : null;
  };

  return (
    <>
      <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
        <div className='modal-email' onKeyUp={keyUp}>
          <div className='paragraph-class'>Edite o e-mail para recebimento dos novos alertas.</div>
          <div className='paragraph-class'>O seu e-mail de cadastro continuará sendo <b>{userEmail}</b></div>
          <TextInput 
            value={email}
            required
            type='email'
            onChange={inputChange}
            name='email'
            label='E-mail'
          />
          <InputError >{ hasError ? 'O e-mail inserido é invalido' : ''}</InputError>
          <ButtonGreen disabled={hasError || !email} classess='button-apply-email' fullWidth onClick={apply}>Salvar e-mail de alerta</ButtonGreen>
        </div>
      </Modal>
    </>
  );
};

export default ModalEmail;
