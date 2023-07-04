import { Dispatch, useState } from 'react';
import Arrow from '@app/assets/images/icons/arrow-down.svg';
import { City } from '@app/models/cities.model';
import { ModalFilters } from '@app/models/filters.model';
import { UserState } from '@app/models/user.model';
import AlertsService from '@app/services/alerts';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import InputError from '@app/ui/components/forms/inputError/inputError';
import Loading from '@app/ui/components/loading/Loading';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './ModalSetAlertSpec.scss';

interface ModalSetAlertSpecProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onClickFilters: () => void;
  onClickKeyWords: () => void;
  userData: UserState;
  openBecomePro: () => void;
  onClickEmail: () => void;
  filters: ModalFilters;
  query: string;
  email: string;
  isAlertsPage?: boolean;
  cities: City[];
}

const ModalSetAlertSpec = ({isOpen, onClickFilters, onClickKeyWords, onClickEmail, onClose, openBecomePro, onSubmit, isAlertsPage, userData, email, filters, query, cities}: ModalSetAlertSpecProps) => {
  const alertsService = new AlertsService();
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [hasError, setError] : [boolean, Dispatch<boolean>] = useState(false);

  const checkPlan = (result: () => void) => {
    if(!userData.plan_pro) {
      openBecomePro();
    } else {
      result();
    }
  };

  const onFilters = () => {
    onClickFilters();
  };

  const onKeyWords = () => {
    onClickKeyWords();
  };

  const onEmail = () => {
    onClickEmail();
  };

  const submit = () => {
    setError(false);
    setLoading(true);
    alertsService.postAlert(filters, query).then(() => {
      onSubmit();
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} title={'Criar Alerta'} showFlag={!userData.plan_pro} onClose={onClose} className='create-alert'>
        <div className='create-alert-content'>
          <p className='title paragraph-class'>
            {TEXTS.createAlertModal.title}
          </p>
          <div className='alert-filters' onClick={() => {checkPlan(onFilters);}}>
            <div className='green-arrow'><img src={Arrow} alt='seta para a direita'/></div>
            <div className='small-text alert-filter-desc'>{TEXTS.createAlertModal.filters}</div>
            {filters.territory_id ? <div className='small-text alert-filter-keys'>{TEXTS.createAlertModal.localFilter} {cities.map(city => filters.territory_id?.includes(city.territory_id) ? city.territory_name : '').filter(item => !!item).join(', ')}</div> : <></>}
            {filters.themes && filters.themes.length ? <div className='small-text alert-filter-keys'>{TEXTS.createAlertModal.themesFilter} {filters.themes?.join(', ')}</div> : <></>}
            {filters.ente && filters.ente.length ? <div className='small-text alert-filter-keys'>{TEXTS.createAlertModal.enteFilter} {filters.ente?.join(', ')}</div> : <></>}
          </div>
          <hr className='thin-line'/>
          <div className='alert-filters' onClick={() => {checkPlan(onKeyWords);}}>
            <div className='green-arrow'><img src={Arrow} alt='seta para a direita'/></div>
            <div className='small-text alert-filter-desc'>{TEXTS.createAlertModal.keyWords}</div>
            <div className='small-text alert-filter-keys'>{query ? query : TEXTS.createAlertModal.keyWordsPlaceHolder}</div>
          </div>
          <hr className='thin-line'/>
          {
            userData.plan_pro && !isAlertsPage ? 
              <div className='small-text email-setting'>
                <span>{TEXTS.createAlertModal.alertDestination} <b>{email || userData.email}</b></span>
                <span className='blue-link hover-animation' onClick={() => {checkPlan(onEmail);}}>{TEXTS.createAlertModal.edit}</span>
              </div> :
              <></>
          }
          <div className='button-space'>
            <InputError>{hasError ? TEXTS.createAlertModal.error : ''}</InputError>
            <ButtonGreen disabled={!query} onClick={() => {checkPlan(submit);}}>{TEXTS.createAlertModal.create}</ButtonGreen>
          </div>
        </div>
      </Modal>
      <Loading isLoading={isLoading}/>
    </>
  );
};

export default ModalSetAlertSpec;
