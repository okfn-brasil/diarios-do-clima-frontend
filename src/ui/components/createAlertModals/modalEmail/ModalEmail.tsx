import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react';
import Modal from '@app/ui/components/modal/Modal';

import './ModalEmail.scss';
import TextInput from '../../forms/input/Input';
import InputError from '../../forms/inputError/inputError';
import SubmitForm from '../../forms/submitForm/SubmitForm';
import Loading from '../../loading/Loading';

interface ModalEmailProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (kewWords: string) => void;
  userEmail: string;
}

const ModalEmail = ({isOpen, userEmail, onBack, onApply}: ModalEmailProps) => {
  const [email, setEmail] : [string, Dispatch<string>] = useState('');
  const [hasError, setError] : [boolean, Dispatch<boolean>] = useState(false);
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    setEmail(userEmail || '');
  }, [userEmail]);

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false);
    setEmail(event.target.value);
  };

  const apply = (e: FormEvent) => {
    e.preventDefault();
    if(/\S+@\S+\.\S+/.test(email)) {
      setError(false);
      setLoading(true);
      setTimeout(() => {
        submitEmail();
      }, 1000);
    } else {
      setError(true);
    }
  };

  const submitEmail = () => {
    //TO DO
    onApply(email);
    setLoading(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
        <form className='modal-email' onSubmit={apply}>
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
          <SubmitForm disabled={hasError || !email} classess='button-apply-email' label='Salvar e-mail de alerta'/>
        </form>
      </Modal>
      <Loading isLoading={isLoading}/>
    </>
  );
};

export default ModalEmail;
