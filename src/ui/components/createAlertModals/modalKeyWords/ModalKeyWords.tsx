import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { FiltersStatePayload } from '@app/models/filters.model';
import Modal from '@app/ui/components/modal/Modal';

import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import TextInput from '@app/ui/components/forms/input/Input';

interface ModalKeyWordsProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (kewWords: string) => void;
  filters: FiltersStatePayload;
  emptyFields: number
}

const ModalKeyWords = ({isOpen, onBack, onApply, filters, emptyFields}: ModalKeyWordsProps) => {
  const [keyWords, setKeyWords] : [string, Dispatch<string>] = useState('');

  useEffect(() => {
    setKeyWords('');
  }, [emptyFields]);

  useEffect(() => {
    setKeyWords((filters.query || '') as string);
  }, [filters]);

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyWords(event.target.value);
  };

  const apply = () => {
    onApply(keyWords);
  };

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === 'Enter' ? apply() : null;
  };
  return (
    <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
      <div className='modal-key-words' onKeyUp={keyUp}>
        <div className='paragraph-class'>Cadastre as palavras-chave do seu alerta e enviaremos as novidades que tiverem os termos buscados.
        </div>
        <TextInput 
          value={keyWords}
          onChange={inputChange}
          name='keywords'
          label='Ex: Consulta teste'
        /> 
        <ButtonGreen disabled={!keyWords} classess='button-apply-key-words' fullWidth onClick={apply}>Aplicar</ButtonGreen>
      </div>
    </Modal>
  );
};

export default ModalKeyWords;
