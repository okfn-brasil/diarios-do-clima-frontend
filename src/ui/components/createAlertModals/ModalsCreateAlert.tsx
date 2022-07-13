
import { convertFiltersToModalFilters, FiltersStatePayload, ModalFilters } from '@app/models/filters.model';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import React, { Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalAlertFilters from './modalAlertFilters/ModalAlertFilters';
import ModalBecomePro from './modalBecomePro/ModalBecomePro';
import ModalSetAlertSpec from './modalSetAlertSpec/ModalSetAlertSpec';
import './ModalsCreateAlert.scss';

interface ModalCreateAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  filters: FiltersStatePayload;
}

const ModalsCreateAlert = ({isOpen, onClose, onOpen, filters}: ModalCreateAlertProps) => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [isOpenBecomePro, setStateBecomePro] : [boolean, Dispatch<boolean>] = useState(false);
  const [isOpenFilters, setStateFilters] : [boolean, Dispatch<boolean>] = useState(false);
  const [definedFilters, setdefinedFilters] : [ModalFilters, Dispatch<ModalFilters>] = useState({});

  useEffect(() => {
    setdefinedFilters(convertFiltersToModalFilters(filters));
  },[filters])

  const onOpenBecomePro = () => {
    onClose();
    setStateBecomePro(true);
  };

  const onClickFilters = () => {
    onClose();
    setStateFilters(true);
  };

  const onBackFilters = () => {
    onOpen();
    setStateFilters(false);
  };

  const onApplyFilters = (filters: FiltersStatePayload) => {
    setdefinedFilters(convertFiltersToModalFilters(filters));
    setStateFilters(false);
    onOpen();
  }
  

  return (
    <>
      <ModalSetAlertSpec filters={definedFilters} openBecomePro={onOpenBecomePro} onClickFilters={onClickFilters} userData={userData} onClose={onClose} isOpen={isOpen}/>
      <ModalBecomePro isOpen={isOpenBecomePro} onClose={() => setStateBecomePro(false)}/>
      <ModalAlertFilters filters={filters} isOpen={isOpenFilters} onApply={onApplyFilters} onBack={onBackFilters}/>
    </>
  );
};

export default ModalsCreateAlert;
