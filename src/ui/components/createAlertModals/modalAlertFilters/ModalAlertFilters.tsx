import { FiltersStatePayload, Theme } from '@app/models/filters.model';
import { CheckBoxesModel } from '@app/models/forms.model';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Modal from '@app/ui/components/modal/Modal';
import EntityFilter from '@app/ui/pages/search/searchFilters/entityFilter/EntityFilter';
import LocationFilter from '@app/ui/pages/search/searchFilters/locationFilter/LocationFilter';
import ThemeFilter from '@app/ui/pages/search/searchFilters/themeFilter/ThemeFilter';
import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import './ModalAlertFilters.scss';

interface ModalAlertFiltersProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (filters: FiltersStatePayload) => void;
  filters: FiltersStatePayload;
}

const themesMock: CheckBoxesModel = {
  'label1': null,
  'label2': null,
  'label3': null,
  'label4': null,
};

const initialFilters: FiltersStatePayload = {
  location: '0',
  ente: '0',
  themes: themesMock,
};

const ModalAlertFilters = ({isOpen, onBack, onApply, filters}: ModalAlertFiltersProps) => {
  const [currFilters, setFilters] : [FiltersStatePayload, Dispatch<SetStateAction<FiltersStatePayload>>] = useState(initialFilters);

  useEffect(() => {
    setFilters(filters);
  }, [filters])

  const inputChange = (event: SelectChangeEvent<string>) => {
    const {name, value} = event.target;
    setFilters((values: FiltersStatePayload) => ({...values, [name]: value}));
  };

  const checkBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    
    setFilters((values: FiltersStatePayload) => ({...values, themes: {
      ...values.themes,
      [name]: checked
    }}));
  };

  const apply = () => {
    onApply(currFilters);
  }

  return (
    <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
      
      <div>
        <div className='modal-filters'>
        <LocationFilter onChange={inputChange} value={currFilters.location as string}/>

        <ThemeFilter onChange={checkBoxChange} options={currFilters.themes as Theme} hasProPlan={true} />
        
        <EntityFilter onChange={inputChange} value={currFilters.ente as string}/>

        <ButtonGreen classess='modal-filter-apply' onClick={apply}>Aplicar Filtros</ButtonGreen>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAlertFilters;
