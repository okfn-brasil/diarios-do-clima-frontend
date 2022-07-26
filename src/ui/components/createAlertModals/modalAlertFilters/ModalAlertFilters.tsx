import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FiltersStatePayload, Theme } from '@app/models/filters.model';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Modal from '@app/ui/components/modal/Modal';
import EntityFilter from '@app/ui/pages/search/searchFilters/entityFilter/EntityFilter';
import LocationFilter from '@app/ui/pages/search/searchFilters/locationFilter/LocationFilter';
import ThemeFilter from '@app/ui/pages/search/searchFilters/themeFilter/ThemeFilter';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { SelectChangeEvent } from '@mui/material';

import { initialFilters } from '../utils';

import './ModalAlertFilters.scss';

interface ModalAlertFiltersProps {
  isOpen: boolean;
  onBack: () => void;
  onApply: (filters: FiltersStatePayload) => void;
  filters: FiltersStatePayload;
  emptyFields: number;
}

const ModalAlertFilters = ({isOpen, emptyFields, onBack, onApply, filters}: ModalAlertFiltersProps) => {
  const [currFilters, setFilters] : [FiltersStatePayload, Dispatch<SetStateAction<FiltersStatePayload>>] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [emptyFields]);

  useEffect(() => {
    setFilters(filters);
  }, [filters]);

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
  };

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === 'Enter' ? apply() : null;
  };

  return (
    <Modal isOpen={isOpen} title={'Editar filtros do alerta'} onBack={onBack} className='create-alert'>
      <div onKeyUp={keyUp}>
        <div className='modal-filters'>
          <LocationFilter onChange={inputChange} value={currFilters.location as string}/>

          <ThemeFilter onChange={checkBoxChange} options={currFilters.themes as Theme} hasProPlan={true} />
        
          <EntityFilter onChange={inputChange} value={currFilters.ente as string}/>

          <ButtonGreen classess='modal-filter-apply' fullWidth onClick={apply}>{TEXTS.filters.applyFilters}</ButtonGreen>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAlertFilters;
