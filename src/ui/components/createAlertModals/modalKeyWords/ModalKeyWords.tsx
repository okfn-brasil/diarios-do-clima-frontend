import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { FiltersStatePayload } from '@app/models/filters.model';
import Modal from '@app/ui/components/modal/Modal';

import TextInput from '../../forms/input/Input';
import ButtonGreen from '../../button/ButtonGreen/ButtonGreen';
import InputError from '../../forms/inputError/inputError';
import { checkKeyWords, parseQuery } from '../utils';
import SubmitForm from '../../forms/submitForm/SubmitForm';

interface ModalKeyWordsProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (kewWords: string) => void;
  filters: FiltersStatePayload;
  emptyFields: number
}

const ModalKeyWords = ({isOpen, onBack, onApply, filters, emptyFields}: ModalKeyWordsProps) => {
  const [keyWords, setKeyWords] : [string, Dispatch<string>] = useState('');
  const [hasError, setError] : [boolean, Dispatch<boolean>] = useState(false);

  useEffect(() => {
    setKeyWords('');
  }, [emptyFields])

  useEffect(() => {
    setKeyWords(parseQuery(filters.query as string));
  }, [filters]);

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyWords(event.target.value);
    convertKeyWords(event.target.value);
  };

  const apply = () => {
    if(convertKeyWords(keyWords)) {
      onApply(keyWords);
    }
  };

  const convertKeyWords = (value: string) => {
    if(checkKeyWords(value)) {
      setError(false);
      return true;
    } else {
      setError(true);
    }
  }

  return (
    <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
      <form className='modal-key-words' onSubmit={apply}>
        <div className='paragraph-class'>Cadastre as palavras-chave do seu alerta e enviaremos as novidades que tiverem os termos buscados.
        </div>
        <TextInput 
          value={keyWords}
          onChange={inputChange}
          name='keywords'
          label='Ex: Gastos; Diário;'
        /> 
        <span className='small-text'> *Separe até 5 palavras-chave com <b>;</b></span>
        <InputError >{ hasError ? 'Utilize no máximo 5 palavras-chave.' : ''}</InputError>
        <SubmitForm disabled={hasError} classess='button-apply-key-words' label='Aplicar'/>
      </form>
    </Modal>
  );
};

export default ModalKeyWords;
