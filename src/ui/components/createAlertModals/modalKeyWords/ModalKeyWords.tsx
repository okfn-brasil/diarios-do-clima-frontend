import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { FiltersStatePayload } from '@app/models/filters.model';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import TextInput from '@app/ui/components/forms/input/Input';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

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
        <div className='paragraph-class'>{TEXTS.modalQuery.title}</div>
        <TextInput 
          value={keyWords}
          onChange={inputChange}
          name='keywords'
          label={TEXTS.modalQuery.inputLabel}
        /> 
        <ButtonGreen disabled={!keyWords} classes='button-apply-key-words' fullWidth onClick={apply}>{TEXTS.modalQuery.apply}</ButtonGreen>
      </div>
    </Modal>
  );
};

export default ModalKeyWords;
